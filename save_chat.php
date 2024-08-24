<?php
$data = file_get_contents('php://input');
$chatMessages = json_decode($data, true);

if ($chatMessages) {
    $file = fopen('chat.txt', 'w');
    foreach ($chatMessages as $message) {
        fwrite($file, "$message\n");
    }
    fclose($file);
}
?>
