<?php
// get message and name
$name = $_POST['name'] ?? '';
$text = $_POST['text'] ?? '';

if (!$name || !$text) {
    http_response_code(400);
    echo "Invalid";
    exit;
}

// format: name::message
$line = $name . "::" . $text . "\n";

// save into messages.txt
file_put_contents("messages.txt", $line, FILE_APPEND);

echo "OK";
