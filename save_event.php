<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $event = json_decode($input, true);

    $file = 'events.json';
    $currentEvents = json_decode(file_get_contents($file), true);
    $currentEvents[] = $event;

    file_put_contents($file, json_encode($currentEvents, JSON_PRETTY_PRINT));
    http_response_code(200);
    echo json_encode(['message' => 'Event added successfully']);
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>
