<?php
// Load .env file with proper parsing
function loadEnv($filePath) {
    if (!file_exists($filePath)) {
        error_log("ENV file not found: $filePath");
        return false;
    }
    
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        error_log("Failed to read ENV file: $filePath");
        return false;
    }
    
    foreach ($lines as $line) {
        $line = trim($line);
        
        // Skip empty lines and comments
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }
        
        // Check for key=value format
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);
            
            // Remove quotes if present
            if ((substr($value, 0, 1) === '"' && substr($value, -1) === '"') ||
                (substr($value, 0, 1) === "'" && substr($value, -1) === "'")) {
                $value = substr($value, 1, -1);
            }
            
            putenv("$name=$value");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
    
    return true;
}

// Load environment variables
$envLoaded = loadEnv(__DIR__ . '/.env');
if (!$envLoaded) {
    error_log("Warning: Could not load .env file");
}

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

// Include PHPMailer
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//---------------------------　SMTP設定　-----------------------
// SMTP Configuration
$smtp_config = [
    'host' => 'smtp.gmail.com',           // SMTP server (Gmail example)
    'port' => 587,                        // SMTP port (587 for TLS, 465 for SSL)
    'username' => getenv('SMTP_USERNAME'),
    'password' => getenv('SMTP_PASSWORD'),
    'encryption' => PHPMailer::ENCRYPTION_STARTTLS, // or PHPMailer::ENCRYPTION_SMTPS for SSL
    'auth' => true,                       // Enable SMTP authentication
    'debug' => 2                          // Debug level (0=off, 1=client, 2=server)
];

// Alternative configurations for different providers
$smtp_alternatives = [
    'gmail' => [
        'host' => 'smtp.gmail.com',
        'port' => 587,
        'encryption' => PHPMailer::ENCRYPTION_STARTTLS
    ],
    'gmail_ssl' => [
        'host' => 'smtp.gmail.com',
        'port' => 465,
        'encryption' => PHPMailer::ENCRYPTION_SMTPS
    ],
    'outlook' => [
        'host' => 'smtp-mail.outlook.com',
        'port' => 587,
        'encryption' => PHPMailer::ENCRYPTION_STARTTLS
    ]
];

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

// Configure PHPMailer with SMTP settings
function configureSMTP($mail, $config) {
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->SMTPAuth = $config['auth'];
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = $config['encryption'];
    $mail->Port = $config['port'];
    $mail->SMTPDebug = $config['debug'];
    
    // Additional SMTP options for better compatibility
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    
    // Set timeout
    $mail->Timeout = 60;
    $mail->SMTPKeepAlive = true;

    // Character encoding
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    
    // Debug credentials (without showing password)
    if ($config['debug'] > 0) {
        error_log("SMTP Config - Host: {$config['host']}, Port: {$config['port']}, Username: {$config['username']}, Encryption: " . ($config['encryption'] ?: 'none'));
    }
}

// Send email to multiple admins using SMTP
function sendSMTPEmailToMultipleAdmins($adminEmails, $subject, $body, $replyToEmail = null, $replyToName = null, $bccEmails = []) {
    global $smtp_config, $from_email, $from_name;

    $results = [];
    $allSent = true;

    foreach ($adminEmails as $adminEmail) {
        $mail = new PHPMailer(true);

        try {
            // Configure SMTP
            configureSMTP($mail, $smtp_config);

            // Sender
            $mail->setFrom($from_email, $from_name);

            // Recipient
            $mail->addAddress($adminEmail, 'Administrator');

            // Reply-To
            if ($replyToEmail) {
                $mail->addReplyTo($replyToEmail, $replyToName ?: $replyToEmail);
            }

            // BCC
            foreach ($bccEmails as $bccEmail) {
                $mail->addBCC($bccEmail);
            }

            // Content
            $mail->isHTML(false); // Plain text
            $mail->Subject = $subject;
            $mail->Body = $body;

            $sent = $mail->send();
            $results[$adminEmail] = $sent;

            if (!$sent) {
                $allSent = false;
            }

        } catch (Exception $e) {
            error_log("SMTP Error for {$adminEmail}: " . $mail->ErrorInfo);
            $results[$adminEmail] = false;
            $allSent = false;
        }
    }

    return ['all_sent' => $allSent, 'results' => $results];
}

// Send email using PHPMailer
function sendSMTPEmail($toEmail, $toName, $subject, $body, $replyToEmail = null, $replyToName = null, $bccEmails = []) {
    global $smtp_config, $from_email, $from_name;

    $mail = new PHPMailer(true);

    try {
        // Configure SMTP
        configureSMTP($mail, $smtp_config);

        // Sender
        $mail->setFrom($from_email, $from_name);

        // Recipient
        $mail->addAddress($toEmail, $toName);

        // Reply-To
        if ($replyToEmail) {
            $mail->addReplyTo($replyToEmail, $replyToName ?: $replyToEmail);
        }

        // BCC
        foreach ($bccEmails as $bccEmail) {
            $mail->addBCC($bccEmail);
        }

        // Content
        $mail->isHTML(false); // Plain text
        $mail->Subject = $subject;
        $mail->Body = $body;

        return $mail->send();

    } catch (Exception $e) {
        error_log("SMTP Error: " . $mail->ErrorInfo);
        throw new Exception("SMTP Error: " . $mail->ErrorInfo);
    }
}

//---------------------------　Main Processing　-----------------------

try {
    // Validate SMTP credentials are set
    $smtp_username = getenv('SMTP_USERNAME');
    $smtp_password = getenv('SMTP_PASSWORD');
    
    // Debug: Log loaded credentials (without password)
    error_log("ENV Loaded: " . ($envLoaded ? 'YES' : 'NO'));
    error_log("SMTP Username from ENV: " . ($smtp_username ?: 'NOT_SET'));
    error_log("SMTP Password Set: " . (!empty($smtp_password) ? 'YES' : 'NO'));
    
    if (empty($smtp_username) || empty($smtp_password) || 
        $smtp_username === 'your-actual-gmail@gmail.com' ||
        $smtp_password === 'your-gmail-app-password' ||
        $smtp_password === 'replace-with-app-password' ||
        $smtp_password === 'your-16-char-app-password') {
        throw new Exception('SMTP credentials not properly configured in .env file. Username: ' . ($smtp_username ?: 'NOT_SET'));
    }

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
    $adminResult = sendSMTPEmailToMultipleAdmins(
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
        $userSent = sendSMTPEmail(
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
            'message' => 'Email sent successfully via SMTP to all admins',
            'data' => [
                'admin_results' => $adminResult['results'],
                'admin_count' => count($admin_emails),
                'user_sent' => $userSent,
                'timestamp' => date('Y-m-d H:i:s'),
                'smtp_host' => $smtp_config['host']
            ]
        ]);
    } else {
        throw new Exception('Failed to send email via SMTP to one or more recipients');
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