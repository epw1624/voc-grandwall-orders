# voc-grandwall-orders
Automating the VOC GrandWall order process

## send_info_emails.py
This script parses an xlsx spreadsheet file with order info and send an email to each buyer with:<br>
    1. a list of items purchased, their cost, and quantity purchased<br>
    2. the total cost of the order<br>
Intended to streamline the logistics of the large VOC GrandWall orders.<br>

To use:<br>
    1. Clone the repository and add a file called credentials.py<br>
    2. In the credentials.py file, add your info in the following format:<br><br>
        SENDER_EMAIL="example@example.com"<br>
        SENDER_PW="qwerty"<br>
        SUBJECT="email title"<br>
        SWAGMASTER_EMAIL="send_etransfers_here@example.com"<br>
        SWAGMASTER_NAME="firstname lastname"<br>

The first 2 values are used to log in to the email account used to send the email, the next 3 are to customize the message.<br>
<br>
    3. Install the required packages panadas, xlrd and openpyxl<br>
    4. Run the script, using the name of the xlsx file as an argument: "python send_info_emails.py spreadsheet.xlsx"

## check_ids.py
This script checks that the VOC ID submitted for each order matches the corresponding entry in the VOC database by email address. Entries that do not match are listed in a .txt file that is generated in the same directory as the script. Each entry has the format:<br>
    5. NAME - ID<br>
where 5 is the row number of the order in the spreadsheet, and NAME, ID are the respective parameters for that entry.<br>

To use:<br>
    1. Clone the repository and add a file called credentials.py<br>
    2. In the credentials.py file, add the following variables with the appropriate values:<br><br>
        API_KEY<br>
        BASE_URL<br>     
    3. Install the required packages pandas and requests<br>
    4. Run the script, using the name of the xlsx file as an argument: "python check_ids.py spreadsheet.xlsx"


