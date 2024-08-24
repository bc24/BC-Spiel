# Bremer Community Spiel

**Entwickelt von Frank Panzer**

## �berblick

Das Bremer Community Spiel ist ein webbasiertes Puzzle-Spiel mit 100 Leveln, in dem die Spieler verschiedene R�tsel l�sen m�ssen. Jeder Level dauert 6 Minuten, und f�r jede richtige Antwort erh�lt der Spieler einen Punkt. Das Spiel speichert Highscores und bietet einen persistenten Chat, in dem die Spieler Nachrichten hinterlassen k�nnen.

## Features

- **100 Level**: Verschiedene R�tsel, die das Denkverm�gen herausfordern.
- **Highscore-Liste**: Speichert die besten Punktzahlen der Spieler.
- **Persistenter Chat**: Spieler k�nnen Nachrichten hinterlassen, die auch nach einem Neuladen der Seite erhalten bleiben.
- **Umlaute**: Alle Umlaute (�, �, �) werden korrekt dargestellt.
- **Namenserfassung**: Spieler m�ssen ihren Namen eingeben, bevor sie das Spiel starten k�nnen.

## Installation

1. **Projekt klonen**: Klone das Repository auf deinen lokalen Rechner.

    ```bash
    git clone https://github.com/bc24/BC-Spiel.git
    ```

2. **Server vorbereiten**: Stelle sicher, dass du einen Webserver wie Apache oder Nginx mit PHP-Unterst�tzung installiert hast, um die Highscore- und Chat-Daten speichern zu k�nnen.

3. **Dateien auf den Server verschieben**: Kopiere alle Dateien in das Root-Verzeichnis deines Servers.

4. **Dateiberechtigungen setzen**: Stelle sicher, dass die `highscores.txt` und `chat.txt` Dateien schreibbar sind.

    ```bash
    chmod 666 highscores.txt
    chmod 666 chat.txt
    ```

5. **Spiel starten**: �ffne die `index.html` Datei im Browser.

## Nutzung

1. �ffne die `index.html` Datei in deinem Browser.
2. Gib deinen Namen ein und klicke auf "Best�tigen".
3. Klicke auf "Spiel Starten", um das Spiel zu beginnen.
4. L�se die R�tsel in jedem Level, um Punkte zu sammeln.
5. Deine Punktzahl wird am Ende des Spiels in der Highscore-Liste gespeichert.
6. Nutze den Chat, um mit anderen Spielern zu kommunizieren.

## Technologie-Stack

- **HTML5**: 
