# Overview

In the second iteration of this task, I realized that it would be smarter to use the Google Apps Script form trigger to automatically send the email as soon as someone makes their order.<br>

This was only somewhat less painful, since I had to use JavaScript instead of Python my beloved, and Google takes the cake on this one for the most useless documentation I have ever seen...<br>

For both of these reasons, I'm tossing both the script file and HTML template in here to hopefully streamline this process for next time!

# Setup

This script requires that you have an object mapping the names of questions on the form to their prices (I'll leave one in as an example). This is gross, so it would be nice to do this in a cleaner way next time. Possibly a spreadsheet mapping form question names to prices, or trigger the entire script off the corresponding spreadsheet instead of the form itself.<br>

To make this run again as is would require the following:<br>
<ul>
    <li>Create the mapping object I described above, with a key-value pair for each GrandWall product and its price</li>
    <li>Replace the index on line 46 with the index of the name question on your form, if applicable</li>
</ul>