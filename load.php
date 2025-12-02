<?php
$messages = [];

if (file_exists("messages.txt")) {
    $lines = file("messages.txt", FILE_IGNORE_NEW_LINES);

    foreach ($lines as $line) {
        list($name, $text) = explode("::", $line, 2);
        $messages[] = ["name" => $name, "text" => $text];
    }
}

echo json_encode($messages);
?>
