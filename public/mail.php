<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

//---------------------------　必須設定　-----------------------
// Administrator email addresses (multiple recipients)
$admin_emails = [
    "saiyou@ex-pr.com",
    "r.uchida@ex-pr.com"
];

// Sender email address and name
$from_email = "saiyou@ex-pr.com";
$from_name = "株式会社エグゼクティブプロテクション";

// Form email field name attribute
$Email = "メールアドレス";

// Mail subject for admin
$subject = "採用LPから応募がありました。";

// BCC recipients (optional)
$bcc_emails = []; // Array of BCC email addresses

// Required fields validation
$requireCheck = 1;
$require = array('氏名', 'ふりがな', '電話番号', 'メールアドレス', '生年月日', '個人情報保護方針');

// Auto-reply settings
$remail = 1;
$re_subject = "ご応募ありがとうございます。株式会社エグゼクティブプロテクション";
$dsp_name = '氏名';

// Auto-reply email content
$remail_text = "お世話になっております。
株式会社エグゼクティブプロテクション　採用担当でございます。

この度は弊社求人にご応募いただき、
誠にありがとうございました。";

// Email signature
$mailSignature = "【3営業日以内】に担当より下記ドメインにてご連絡いたします。
～～～@ex-pr.hrmos.co

ご不明な点がございましたら、ご遠慮なくお問い合わせください。
何卒よろしくお願いいたします。

━━━━━━━━━━━━━━━━━━━━━━━
株式会社エグゼクティブプロテクション
採用担当

★お問い合わせ先★
企業URL：https://ex-pr.com/
mail:saiyou@ex-pr.com
tell：03－5414－7477
━━━━━━━━━━━━━━━━━━━━━━━";

//---------------------------　Core Functions　-----------------------

// Sanitize input data
function sanitize($data) {
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return str_replace("\0", "", trim($data));
}

// HTML escape function
function h($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

// Email validation
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Required fields validation
function validateRequired($data, $required) {
    $errors = [];

    foreach ($required as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $errors[] = "【{$field}】は必須項目です。";
        }
    }

    return $errors;
}

// Convert POST data to email body
function formatEmailBody($data) {
    $body = "";
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            $value = implode(', ', $value);
        }
        $body .= "【 " . h($key) . " 】 " . h($value) . "\n";
    }
    return $body;
}

// Create admin email content
function createAdminEmailContent($data) {
    $body = "下記内容で、LPからの応募を受け付けました。\n";
    $body .= "内容を確認の上、応募者への連絡をしてください。\n";
    $body .= "＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
    $body .= formatEmailBody($data);
    $body .= "\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n";
    $body .= "このメールは応募受信をお知らせする自動通知メールです。\n";
    $body .= "送信された日時：" . date("Y/m/d (D) H:i:s") . "\n";
    $body .= "送信者のIPアドレス：" . ($_SERVER["REMOTE_ADDR"] ?? 'Unknown') . "\n";
    $body .= "送信者のホスト名：" . gethostbyaddr($_SERVER['REMOTE_ADDR'] ?? '') . "\n";
    $body .= "問い合わせのページURL：" . ($_SERVER['HTTP_REFERER'] ?? 'Direct access') . "\n";

    return $body;
}

// Create user auto-reply email content
function createUserEmailContent($data) {
    global $dsp_name, $remail_text, $mailSignature;

    $body = "";
    if (isset($data[$dsp_name])) {
        $body .= h($data[$dsp_name]) . " 様\n\n";
    }

    $body .= $remail_text . "\n\n";
    $body .= "＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
    $body .= formatEmailBody($data);
    $body .= "\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
    $body .= "送信日時：" . date("Y/m/d (D) H:i:s") . "\n\n";
    $body .= $mailSignature;

    return $body;
}

// Create email headers for mail() function
function createHeaders($replyToEmail = null, $replyToName = null, $bccEmails = []) {
    global $from_email, $from_name;

    $headers = "From: ";
    if (!empty($from_name)) {
        $headers .= mb_encode_mimeheader($from_name, 'UTF-8') . " <{$from_email}>\r\n";
    } else {
        $headers .= "{$from_email}\r\n";
    }

    if ($replyToEmail) {
        if ($replyToName) {
            $headers .= "Reply-To: " . mb_encode_mimeheader($replyToName, 'UTF-8') . " <{$replyToEmail}>\r\n";
        } else {
            $headers .= "Reply-To: {$replyToEmail}\r\n";
        }
    }

    foreach ($bccEmails as $bccEmail) {
        $headers .= "Bcc: {$bccEmail}\r\n";
    }

    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return $headers;
}

// Send email to multiple admins using mail() function
function sendEmailToMultipleAdmins($adminEmails, $subject, $body, $replyToEmail = null, $replyToName = null, $bccEmails = []) {
    global $from_email;

    $results = [];
    $allSent = true;

    foreach ($adminEmails as $adminEmail) {
        $headers = createHeaders($replyToEmail, $replyToName, $bccEmails);
        $sent = mail($adminEmail, $subject, $body, $headers, "-f{$from_email}");
        $results[$adminEmail] = $sent;
        if (!$sent) {
            $allSent = false;
        }
    }

    return ['all_sent' => $allSent, 'results' => $results];
}

// Send email using mail() function
function sendEmail($toEmail, $toName, $subject, $body, $replyToEmail = null, $replyToName = null, $bccEmails = []) {
    global $from_email;

    $headers = createHeaders($replyToEmail, $replyToName, $bccEmails);
    return mail($toEmail, $subject, $body, $headers, "-f{$from_email}");
}

//---------------------------　Main Processing　-----------------------

try {
    // Get and sanitize POST data
    $postData = sanitize($_POST);

    if (empty($postData)) {
        throw new Exception('No data received');
    }

    // Validate required fields
    if ($requireCheck) {
        $validationErrors = validateRequired($postData, $require);
        if (!empty($validationErrors)) {
            echo json_encode([
                'success' => false,
                'message' => 'Required fields are missing',
                'errors' => $validationErrors
            ]);
            exit();
        }
    }

    // Validate email format
    $userEmail = '';
    $userName = '';
    if (isset($postData[$Email])) {
        $userEmail = $postData[$Email];
        if (!validateEmail($userEmail)) {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email format',
                'errors' => ["【{$Email}】はメールアドレスの形式が正しくありません。"]
            ]);
            exit();
        }
    }

    // Get user name for display
    if (isset($postData[$dsp_name])) {
        $userName = $postData[$dsp_name];
    }

    // Send admin emails to multiple recipients
    $adminBody = createAdminEmailContent($postData);
    $adminResult = sendEmailToMultipleAdmins(
        $admin_emails,
        $subject,
        $adminBody,
        $userEmail,
        $userName,
        $bcc_emails
    );

    // Send auto-reply email if enabled and user email provided
    $userSent = true;
    if ($remail && !empty($userEmail)) {
        $userBody = createUserEmailContent($postData);
        $userSent = sendEmail(
            $userEmail,
            $userName,
            $re_subject,
            $userBody
        );
    }

    // Return success response
    if ($adminResult['all_sent'] && $userSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully via mail() to all admins',
            'data' => [
                'admin_results' => $adminResult['results'],
                'admin_count' => count($admin_emails),
                'user_sent' => $userSent,
                'timestamp' => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        throw new Exception('Failed to send email via mail() to one or more recipients');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage(),
        'errors' => []
    ]);
}
?>