# voc-grandwall-orders
Automating emails for VOC Grandwall orders

This script parses an xlsx spreadsheet file with order info and send an email to each buyer with:<br>
    1. a list of items purchased, their cost, and quantity purchased<br>
    2. the total cost of the order<br>
Intended to streamline the logistics of the large VOC GrandWall orders.<br>

# To use:<br>
    1. Clone the repository and add a file called credentials.py<br>
    2. In the credentials.py file, add your info in the following format:<br>
        SENDER_EMAIL="example@example.com"<br>
        SENDER_PW="qwerty"<br>
        SUBJECT="email title"<br>
        SWAGMASTER_EMAIL="send_etransfers_here@example.com"<br>
        SWAGMASTER_NAME="firstname lastname"<br>

The first 2 values are used to log in to the email account used to send the email, the next 3 are to customize the message.<br>
<br>
    3. Install the required packages with "pip install -r requirements.txt"<br>
    4. Run the script, using the name of the xlsx file as an argument: "python send_info_emails.py spreadsheet.xlsx" <br>


