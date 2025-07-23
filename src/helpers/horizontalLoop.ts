import gsap from 'gsap';

// Configuration interface for the horizontalLoop function
interface HorizontalLoopConfig {
  speed?: number;
  paused?: boolean;
  repeat?: number;
  reversed?: boolean;
  paddingRight?: number | string;
  snap?: number | boolean | ((value: number) => number);
}

// Extended timeline interface with additional methods
interface HorizontalLoopTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
}

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
export function horizontalLoop(
  items: gsap.DOMTarget,
  config?: HorizontalLoopConfig
): HorizontalLoopTimeline {
  const itemsArray: Element[] = gsap.utils.toArray(items);
  const finalConfig: HorizontalLoopConfig = config || {};

  const onReverseCompleteCallback = () => tl.totalTime(tl.rawTime() + tl.duration() * 100);

  let tl = gsap.timeline({
      repeat: finalConfig.repeat,
      paused: finalConfig.paused,
      defaults: {ease: 'none'},
      onReverseComplete: onReverseCompleteCallback as () => void,
    }) as HorizontalLoopTimeline,
    length: number = itemsArray.length,
    startX: number = (itemsArray[0] as HTMLElement).offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    curIndex: number = 0,
    pixelsPerSecond: number = (finalConfig.speed || 1) * 100,
    snap: (value: number) => number = finalConfig.snap === false
      ? (v: number) => v
      : (gsap.utils.snap as (snap: number | boolean | ((value: number) => number)) => (value: number) => number)(finalConfig.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth: number,
    curX: number,
    distanceToStart: number,
    distanceToLoop: number,
    item: Element,
    i: number;

  gsap.set(itemsArray, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i: number, el: Element) => {
      let w: number = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w) * 100 +
        (gsap.getProperty(el, 'xPercent') as number)
      );
      return xPercents[i];
    },
  });

  gsap.set(itemsArray, {x: 0});

  totalWidth =
    (itemsArray[length - 1] as HTMLElement).offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    (itemsArray[length - 1] as HTMLElement).offsetWidth *
    (gsap.getProperty(itemsArray[length - 1], 'scaleX') as number) +
    (parseFloat(finalConfig.paddingRight as string) || 0);

  for (i = 0; i < length; i++) {
    item = itemsArray[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = (item as HTMLElement).offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, 'scaleX') as number);
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
    (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex: number = gsap.utils.wrap(0, length, index),
      time: number = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance

  if (finalConfig.reversed) {
    // Type-safe way to call onReverseComplete
    const onReverseComplete = (tl.vars as any).onReverseComplete;
    if (typeof onReverseComplete === 'function') {
      onReverseComplete();
    }
    tl.reverse();
  }

  return tl;
}