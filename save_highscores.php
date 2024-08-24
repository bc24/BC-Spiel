<?php
$data = file_get_contents('php://input');
$highscores = json_decode($data, true);

if ($highscores) {
    $file = fopen('highscores.txt', 'w');
    foreach ($highscores as $entry) {
        fwrite($file, "{$entry['name']}: {$entry['score']} Punkte\n");
    }
    fclose($file);
}
?>
