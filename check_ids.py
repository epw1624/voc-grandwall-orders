import sys
import pandas
import requests
import credentials

EMAIL_COL = 3
NAME_COL = 4
ID_COL = 5

def check_id(id):
    try:
        id_as_int = int(id)
        return id_as_int
    except ValueError:
        return False

if __name__ == "__main__":
    args = sys.argv

    if (len(args) < 2):
        print("Please include the path to the spreadsheet file as an argument")

    else :
        spreadsheet_name = args[1]

        data = pandas.read_excel(spreadsheet_name)

        # list of lists for the entries in the spreadsheet with invalid ids
        # the values added will be: row index, name, id
        invalid_ids = []

        for index, row in data.iloc[1:].iterrows():
            email = row[EMAIL_COL]
            raw_id = row[ID_COL]

            voc_id = check_id(raw_id)

            if not voc_id:
                list_entry = [index, row[NAME_COL], row[ID_COL]]
                invalid_ids.append(list_entry)

            else:
                query = credentials.BASE_URL + '?id={id}'.format(id=voc_id)
                header = {
                    "AUTH": credentials.API_KEY
                    }
                response = requests.get(query, headers=header)
                response = response.json()

                if response['status'] != 0 or (response['status'] == 0 and response['content']['email'] != email):
                    list_entry = [index, row[NAME_COL], int(row[ID_COL])]
                    invalid_ids.append(list_entry)

        with open('invalid_ids.txt', 'w') as output_file:
            for entry in invalid_ids:
                row_num, name, id = entry
                row_num += 2
                output_file.write(f'{row_num}. {name} - {id}\n')
            output_file.close()

        

