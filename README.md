# Bremer Community Spiel

**Entwickelt von Frank Panzer**

## Überblick

Das Bremer Community Spiel ist ein webbasiertes Puzzle-Spiel mit 100 Leveln, in dem die Spieler verschiedene Rätsel lösen müssen. Jeder Level dauert 6 Minuten, und für jede richtige Antwort erhält der Spieler einen Punkt. Das Spiel speichert Highscores und bietet einen persistenten Chat, in dem die Spieler Nachrichten hinterlassen können.

## Features

- **100 Level**: Verschiedene Rätsel, die das Denkvermögen herausfordern.
- **Highscore-Liste**: Speichert die besten Punktzahlen der Spieler.
- **Persistenter Chat**: Spieler können Nachrichten hinterlassen, die auch nach einem Neuladen der Seite erhalten bleiben.
- **Umlaute**: Alle Umlaute (ä, ö, ü) werden korrekt dargestellt.
- **Namenserfassung**: Spieler müssen ihren Namen eingeben, bevor sie das Spiel starten können.

## Installation

1. **Projekt klonen**: Klone das Repository auf deinen lokalen Rechner.

    ```bash
    git clone https://github.com/bc24/BC-Spiel.git
    ```

2. **Server vorbereiten**: Stelle sicher, dass du einen Webserver wie Apache oder Nginx mit PHP-Unterstützung installiert hast, um die Highscore- und Chat-Daten speichern zu können.

3. **Dateien auf den Server verschieben**: Kopiere alle Dateien in das Root-Verzeichnis deines Servers.

4. **Dateiberechtigungen setzen**: Stelle sicher, dass die `highscores.txt` und `chat.txt` Dateien schreibbar sind.

    ```bash
    chmod 666 highscores.txt
    chmod 666 chat.txt
    ```

5. **Spiel starten**: Öffne die `index.html` Datei im Browser.

## Nutzung

1. Öffne die `index.html` Datei in deinem Browser.
2. Gib deinen Namen ein und klicke auf "Bestätigen".
3. Klicke auf "Spiel Starten", um das Spiel zu beginnen.
4. Löse die Rätsel in jedem Level, um Punkte zu sammeln.
5. Deine Punktzahl wird am Ende des Spiels in der Highscore-Liste gespeichert.
6. Nutze den Chat, um mit anderen Spielern zu kommunizieren.

## Technologie-Stack

- **HTML5**: 
