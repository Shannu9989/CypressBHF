Feature: VARI Details Tab Regression suite

     As a user I should be able to test VARI Details Tab in CSR Portal.
    
    Scenario:  As a user, he/she should launch the application successfully
       Given   User should launch the application
        When   User enters UserName
         And   User enters Password
         And   User clicks on Login Button
        Then   User should see login message 'Logon successful'
   
    Scenario:  User should be able to search for a policy 
        When   User enters a policy
         And   User clicks on Search Button
        Then   User should be able to see CSR Policy Page 'Customer service Portal - Policy '
    
    Scenario:  User should be able to Authorize the call
        When   User clicks on authorize button
        Then   Policy Number should reflect in authorize label
         And   Full Name should reflect in authorize label
         And   Authorized Role should reflect in authorize label
         And   Authorized Full Name should reflect in Notes tab
         And   Authorized Role should reflect in Notes label
    
    Scenario:  User should be able to check Policy Details checkbox
        When   User checks the checkboxes they should reflect in Requested Details and user should be able to close the call

    Scenario:  User should be able to see the authorized Time in My call History Widget
        Then   User should see the time in My Call History Widget

    Scenario:  User should be able to see the authorized policy, date and reason in My call History Widget
         And   User should see the authorized policy in My Call History Widget
         And   User should see the caller's reason in My Call History Widget
         And   User should see the today's date in My Call History Widget

    Scenario:  User should be able to search for the atuthorized policy again
        When   User enters the authorized policy
         And   User clicks on the Search Button
        Then   User should be able to see CSR Policy Page 'Customer service Portal - Policy ' 

    Scenario:  User should be able to see the Caller's Name,Role,Reason and Time in Call History Widget
        When   User clicks on Call history Widget
        Then   The Name of the Authorized caller should be displayed in Call history Caller Name Label
         And   The Role of the Authorized Caller should reflect in Call history Caller Role Label
         And   The Reason for which the caller called should reflect in Call history Caller Role Label
         And   The time when call is closed should reflect in Call history Date Label

    Scenario:  User should be able to open Call Details Widget
        When   User clicks on the first record on Call history Widget
        Then   User should be able to see Call Details Widget

    Scenario:  User should be able to see the Caller's Name,Role,Reason and Time in Call Details Widget
        Then   The Name of the Authorized caller should be displayed in Call Details Caller Name Label
         And   The Role of the Authorized Caller should reflect in Call Details Caller Role Label
         And   The Reason for which the caller called should reflect in Call Details Caller Role Label
         And   The time when call is closed should reflect in Call Details Date Label  

    Scenario:  User should be able to see the Details Tab checked fields in Call Details Widget
        Then   User should be able to see 'DETAILS' in Call Details Widget
         And   User should be able to see Policy Number Label in Call Details Widget
         And   User should be able to see Policy Number in Call Details Widget
         And   User should be able to see Issue Date Label in Call Details Widget   
         And   User should be able to see Policy's Issue Date in Call Details Widget   
         And   User should be able to see Issue State Label in Call Details Widget 
         And   User should be able to see Policy's Issue State in Call Details Widget  

    Scenario:  User should be able to see the Values Tab checked fields in Call Details Widget
        Then   User should be able to see 'VALUES' in Call Details Widget
         And   User should be able to see 'Effective Date' in Call Details Widget
         And   User should be able to see Today's Effective Date in Call Details Widget
         And   User should be able to see Face Amount Label in Call Details Widget    
         And   User should be able to see Face Amount in Call Details Widget
         And   User should be able to see Accumulated Cash Value Label in Call Details Widget
         And   User should be able to see Accumulated Cash Value in Call Details Widget   
         And   User should be able to see Net Cash Surrender Value Label in Call Details Widget   
         And   User should be able to see Net Cash Surrender Value in Call Details Widget 
         And   User should be able to see Quoted Effective Date in Call Details Widget
         And   User should be able to see Quoted Face Amount Label in Call Details Widget 
         And   User should be able to see Quoted Face Amount in Call Details Widget 
         And   User should be able to see Quoted Accumulated Cash Value Label in Call Details Widget   
         And   User should be able to see Quoted Accumulated Cash Value in Call Details Widget   
         And   User should be able to see Quoted Net Cash Surrender Value Label in Call Details Widget 
         And   User should be able to see Quoted Net Cash Surrender Value in Call Details Widget   

    Scenario:  User should be able to see the Funds Tab checked fields in Call Details Widget
        Then   User should be able to see 'FUNDS' in Call Details Widget
         And   User should be able to see 'Investment' Label in Call Details Widget
         And   User should be able to see 'Number' Label in Call Details Widget
         And   User should be able to see Fund Number in Call Details Widget   
         And   User should be able to see 'Future Allocation' Label in Call Details Widget   
         And   User should be able to see Future Allocation in Call Details Widget 

    
              
      
  





   