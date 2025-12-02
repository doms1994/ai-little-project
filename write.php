<?php
// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$name = trim($_POST['name'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '') {
    http_response_code(400);
    exit;
}

// Format: name::message
$line = $name . "::" . $message . "\n";

// Save to text file
file_put_contents("messages.txt", $line, FILE_APPEND | LOCK_EX);

echo "OK";
