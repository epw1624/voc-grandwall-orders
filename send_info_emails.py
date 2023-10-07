import pandas
import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import credentials

NAME_COL = 4
AMOUNT_COL = 1
EMAIL_COL = 3

if __name__=="__main__":
    args = sys.argv

    # check that argument has been provided
    if (len(args) != 1):
        print("Please include the path to the spreadsheet file as an argument")

    else:
        spreadsheet_name = args[1]

        data = pandas.read_excel(spreadsheet_name)

        # define message content variables
        sender_email = credentials.SENDER_EMAIL
        sender_pw = credentials.SENDER_PW
        subject = credentials.SUBJECT
        email_start_template = "Hello {name},\n\nThis is what we have recorded for your GrandWall order:\n\n"
        email_end_template = "\nTo pay for your order, please etransfer ${amount} to " + credentials.SWAGMASTER_EMAIL + '\n\nThanks,\n' + credentials.SWAGMASTER_NAME + '\nProduct and Sales Coordinator / Swag Master\nUBC Varsity Outdoor Club'

        # make email connection
        # this would have to be changed for a non-gmail sender
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_pw)

        first_row = data.keys()

        for index, row in data.iloc[1:].iterrows(): # each row in data is an order entry in the spreadsheet
            row = row.fillna(0)
            
            # add name to start of email if specified
            name = ''
            if row[NAME_COL]:
                name = row[NAME_COL]
            email_body = email_start_template.format(name=name)

            # make list of all things ordered
            items_ordered = {}
            for col in range(11, 85):
                if row[col] and row[col] != 'nan':
                    items_ordered[str(first_row[col])] = row[col]

            # add the list to the email
            for key in items_ordered.keys():
                val = items_ordered[key]
                email_body += (key + ": " + str(val) + '\n')

            # add total at the bottom
            amount_owed = round(row[AMOUNT_COL], 2)
            email_body += email_end_template.format(amount=amount_owed)

            # create email
            message = MIMEMultipart()
            message['From'] = sender_email
            message['To'] = row[EMAIL_COL]
            message['Subject'] = subject

            message.attach(MIMEText(email_body, 'plain'))
            server.sendmail(sender_email, row[EMAIL_COL], message.as_string())

        server.quit()

