totalquest@outlook.com : funfunfun1
emailjs... totalquest@outlook.com : funfunfun1

# General Pages (USER)

Start.js -- The page in which you select a city. -- DONE!!
- Added authentication 3/3

Login.js -- login page -- DONE!!
- this is done

Signup.js - sign-up page -- DONE!!
- this is done

Profile.js - update profile information page -- DONE!!
- this is done

About.js -- about our team -- DONE!!
- no authentication is needed

Contact.js -- contact us form 
- need to add in email.js so the email goes to us
- no authentication is needed

# Hunt Pages (USER)

Hunts.js -- the list of available hunts to select -- this will have a hard programmed explore and indulge page
- need to add authentication 
- need to query the hunts and display onto cards

Hunt.js -- inside the selected hunt -- displaying the individual hunt items 
- need to add authentication -- DONE
- need to populate the items via params from the hunts.js page when they select hunt title. -- query in place!

/Seattle/Explore.js -- same as hunt.js but hard targetted the seattle explore hunt page 
- need to add authentication
- have template just need to create file and pull explore hunt data into it 

/Seattle/Indulge.js -- same as the hunt.js but hard targetted to seattle indulge hunt page
- need to add authentication
- have template just need to create file and pull indulge hunt data into it 

/Spokane/Explore.js -- same as hunt.js but hard targetted the spokane explore hunt page
- need to add authentication
- have template just need to create file and pull explore hunt data into it 

/Spokane/Indulge.js -- same as hunt.js but hard targetted the spokane indulge hunt page
- need to add authentication
- have template just need to create file and pull indulge hunt data into it 

# Hunt Item Pages (USER)

HuntItem.js -- The hint page 
- need to add authentication 
- need to add a flow of hints
    -- remove points from user and set their show hint value to true for which hint they are on

(unknown file name) Hunt Item Victory -- The hunt victory page
- need to add authentication 
- authentication needs to target back to the current victory page


/  -> start -> /:city (HUNTS FOR THAT CITY) ->

/hunt/:huntId (HUNT ITEMS FOR THAT HUNT) ->

/hints/:huntItemId (HINTS FOR THAT HUNT ITEM)

/victory/:huntItemId (Victory page for that hunt item)

