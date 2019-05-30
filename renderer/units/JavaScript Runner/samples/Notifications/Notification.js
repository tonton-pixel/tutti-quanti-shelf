// Notification
let myNotification = new Notification
(
    "Tutti QUanti Shelf",
    { body: "Lorem ipsum dolor sit amet..." }
);
myNotification.onclick = () => { $.clear (); $.writeln ("Notification clicked."); };
