import {Given,When,Then,And} from 'cypress-cucumber-preprocessor/steps'
import Details, { } from 'C:\\Users\\spathan4\\Downloads\\Documents\\BHFCucumber\\cypress\\integration\\cucumber-bdd-test\\AnnuitiesDetails\\Details.js';
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
beforeEach(function()
    {
      cy.fixture('example').then(function(data)
      {
        this.data = data
      })
    })
Given('User should launch the application', function()
{
  cy.visit(Cypress.env('PILOT1'))
})

When('User enters UserName', function()
{
    Details.elements.UserName().type(this.data.username)
})

And('User enters Password', function()
{
    Details.elements.Password().type(this.data.password)
})

And('User clicks on Login Button', function()
{
    Details.LoginButton()
})

Then('User should see login message {string}', greenmessage =>
{
    Details.elements.LoginMessage().contains(greenmessage).should('be.visible')
})

When('User enters a policy', function()
{
  Details.elements.SearchPolicy().type(this.data.policy)     
})

And('User clicks on Search Button', function()
{
  Details.SearchButton()
      cy.xpath('//span[@class="ng-star-inserted"]').then($el =>
      {
        console.log($el.text())
        if ($el.text() =="Search Results ")
         {
           cy.get('#_0__NAME').click()
           Details.elements.PolicyNumLabel().should('have.text',this.data.policy);
         }
         else
         {
          Details.elements.PolicyNumLabel().should('have.text',this.data.policy);
         }
      })     
})

Then('User should be able to see CSR Policy Page {string}', PolicyPage =>
{
  Details.elements.CSRPolicyPage().should('contain',PolicyPage)
})

When('User clicks on authorize button', function()
{
  Details.AuthorizeButton()
})

Then('Policy Number should reflect in authorize label', function()
{
  Details.elements.AutLabPolNum().should('have.text',this.data.policy)
})

And('Full Name should reflect in authorize label', function()
{
  Details.elements.FullNameLab().invoke('text').then((aut1) =>
  {
    Details.elements.AutLabFullNam().invoke('text').as('callername').should((aut2) =>
     {
       expect(aut1).be.eq(aut2);
     })
  })
})

And('Authorized Role should reflect in authorize label', function()
{
  Details.elements.RoleLabel().invoke('text').then((aut1) =>
  {
    Details.elements.AutLabRole().invoke('text').as('callerrole').should((aut2) =>
    {
      expect(aut1).be.eq(aut2);
    })
  })
})

And('Authorized Full Name should reflect in Notes tab', function()
{
 Details.elements.AutLabFullNam().invoke('text').then((aut1) =>
  {
    Details.elements.NotesLabel().invoke('val').should((aut2) =>
     {
       expect(aut2).to.include(aut1.trim());
     })
  })
})

And('Authorized Role should reflect in Notes label', function()
{
  Details.elements.AutLabRole().invoke('text').then((aut1) =>
  {
    Details.elements.NotesLabel().invoke('val').should((aut2) =>
    {
      expect(aut2).to.include(aut1.trim());
    })
  })
})

When('User checks the checkboxes they should reflect in Requested Details and user should be able to close the call', function()
{
      //Details Tab
      //Explicit Wait
      cy.wait(10000)

      //Details Tab Field Validation
      Details.elements.DetVerPath()
      .should('contain','Status').and('contain','Grace Period Ending').and('contain','Restrict Code')
      .and('contain','Suspend Code').and('contain','Company Code').and('contain','Policy Number')
      .and('contain','Plan Code').and('contain','Product Name').and('contain','Product Type')
      .and('contain','Issue Date').and('contain','Maturity Expiry Date').and('contain','Issue State')
      .and('contain','Orginating System').and('contain','Modified Endowment Contract').and('contain','MEC Date')

      //User checks Policy Number Checkbox
      Details.PolicyNoChkBox();

      //Upon checking the checkbox Details tab name should reflect in Requested Details Tab
      Details.elements.ReqDetTab().contains('DETAILS').should('be.visible')

      //Upon checking the checkbox Policy Number Label should reflect in Requested Details Tab
      Details.elements.PolicyNo().invoke('text').as('PolN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
         {
           expect(det2).to.include(det1.trim());
         })
      })

      //Upon checking the checkbox Policy Number should reflect in Requested Details Tab
      Details.elements.PolicyNoLabel().invoke('text').as('PolL').then((dt2) =>
      {
        Details.elements.ReqDetFeiVal().contains(dt2).should('be.visible')
      })

      //User checks Issue Date checkbox
      Details.IssDteChkBox();

      //Upon checking the checkbox Issue Date Label should reflect in Requested Details Tab
      Details.elements.IssDate().invoke('text').as('IssDN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
         {
           expect(det2).to.include(det1.trim());
         })
      })

      //Upon checking the checkbox Issue Date should reflect in Requested Details Tab
      Details.elements.IssDateLabel().invoke('text').as('IssDL').then((dt2) =>
      {
        Details.elements.ReqDetFeiVal().contains(dt2).should('be.visible')
      })

      //User checks Issue State checkbox
      Details.IssStateChkBox();

      //Upon checking the checkbox Issue State Label should reflect in Requested Details Tab
      Details.elements.IssState().invoke('text').as('IssSN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
         {
           expect(det2).to.include(det1.trim());
         })
      })

      //Upon checking the checkbox Issue State should reflect in Requested Details Tab
      Details.elements.IssStateLabel().invoke('text').as('IssSL').then((dt2) =>
      {
        Details.elements.ReqDetFeiVal().contains(dt2).should('be.visible')
      })

      //Riders Tab
      //User clicks on Riders Tab
      Details.Riders();

      //Explicit Wait
      cy.wait(6000)

      //Riders tab should display below message.......
      Details.elements.VARIRiderScr().should('contain',' For this information, please go to Native system.')
      
      
      //Billing Tab:
      //User clicks on Billing Tab
      Details.Billing();

      //Explicit Wait
      cy.wait(5000)

      //Billing tab should display below message.....
      Details.elements.VARIBillScr().should('contain',' For this information, please go to Native system.')
        
      //Values Tab:
      //User clicks on Values Tab
      Details.Values()

      //Explicit Wait
      cy.wait(5000)

      //Values Tab Field Validation
      Details.elements.ValuesVerPath().should('contain','Message').and('contain','Face Amount')
      .and('contain','Accumulated Cash Value').and('contain','Net Cash Surrender Value')
      .and('contain','Surrender Penalty').and('contain','Death Benefit Amount') .and('contain','Death Benefit Option')
      .and('contain','Base Gross Death Benefit').and('contain','Base Net Death Benefit')
      .and('contain','Max Gross Partial Surrender Amount').and('contain','Max Net Partial Surrender Amount')
      .and('contain','AMT W/O AFCT GMDB')

      //User clicks on Face Amount CheckBox
      Details.FaceAmtChkBox();

      //Upon checking the checkbox Values tab name should reflect in Requested Details Tab
      Details.elements.ReqDetTab().contains('VALUES').should('be.visible')

      //Upon checking the checkbox Effective Date Label should reflect in Requested Details Tab
      Details.elements.ReqDetFeiName().should('contain','Effective Date:')

      //Upon checking the checkbox Effective Date should reflect in Requested Details Tab
      Details.elements.Valeffdt().invoke('val').as('eff1').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //Upon checking the checkbox Face Amount Label should reflect in Requested Details Tab
      Details.elements.FaceAmt().invoke('text').as('FAN1').then((val1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
         {
           expect(val2).to.include(val1.trim());
         })
      })

      //Upon checking the checkbox Face Amount should reflect in Requested Details Tab
      Details.elements.FaceAmtLabel().invoke('text').as('FAL1').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //User clicks on Accumalated CashValue Checkbox
      Details.AcccashChkBox();

      //Upon checking the checkbox Accumalated CashValue Label should reflect in Requested Details Tab
      Details.elements.AcccashVal().invoke('text').as('AccN1').then((val1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
         {
           expect(val2).to.include(val1.trim());
         })
      })

      //Upon checking the checkbox Accumalated CashValue should reflect in Requested Details Tab
      Details.elements.AcccashValLabel().invoke('text').as('AccL1').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //User clicks on Net Cash Surrender Value Checkbox
      Details.NetCashSurrChkBox();

      //Upon checking the checkbox Net Cash Surrender Value Label should reflect in Requested Details Tab
      Details.elements.NetCashSurr().invoke('text').as('NetN1').then((val1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
         {
           expect(val2).to.include(val1.trim());
         })
      })

      //Upon checking the checkbox Net Cash Surrender Value should reflect in Requested Details Tab
      Details.elements.NetCashSurrLab().invoke('text').as('NetL1').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //User clicks on Calender Icon
      Details.CallIcon()

      //User clicks on Month and Year Button
      Details.ChooseMnYr()

      //User selects year
      Details.elements.CalBody().each(($el,index,$list)=>
      {
         var Year =$el.text()
         if(Year=='2021')
         {
           cy.wrap($el).click({force: true})
         }
      })

      //User selects month 
      Details.elements.CalBody().each(($el)=>
      {
         var Month =$el.text()
         if(Month=='DEC')
         {
           cy.wrap($el).click({force: true})
         }
      })

      //User selects Date
      Details.elements.CalBody().each(($el)=>
      {
         var Date =$el.text()
         if(Date=='12')
         {
           cy.wrap($el).click({force: true})
         }
      })

      //User clicks on Quote Button
      Details.ButtonQuote()

      //Explicit Wait
      cy.wait(10000)

      //After Quoting User clicks on Face Amount Checkbox
      Details.FaceAmtChkBox();

      //After Quoting Upon checking the checkbox Effective Date Label should reflect in Requested Details Tab
      Details.elements.ReqDetFeiName().should('contain','Effective Date:')

      //After Quoting Upon checking the checkbox Effective Date should reflect in Requested Details Tab
      Details.elements.Valeffdt().invoke('val').as('eff2').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //After Quoting Upon checking the checkbox Face Amount Label should reflect in Requested Details Tab
      Details.elements.FaceAmt().invoke('text').as('FAN2').then((val1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
         {
           expect(val2).to.include(val1.trim());
         })
      })

      //After Quoting Upon checking the checkbox Face Amount should reflect in Requested Details Tab
      Details.elements.FaceAmtLabel().invoke('text').as('FAL2').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //After Quoting User clicks on Accumalated CashValue Checkbox
      Details.AcccashChkBox();

      //After Quoting Upon checking the checkbox Accumalated CashValue Label should reflect in Requested Details Tab
      Details.elements.AcccashVal().invoke('text').as('AccN2').then((val1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
         {
           expect(val2).to.include(val1.trim());
         })
      })

      //After Quoting Upon checking the checkbox Accumalated CashValue should reflect in Requested Details Tab
      Details.elements.AcccashValLabel().invoke('text').as('AccL2').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //After Quoting User clicks on Net Cash Surrender Value Checkbox
      Details.NetCashSurrChkBox();

      //After Quoting Upon checking the checkbox Net Cash Surrender Value Label should reflect in Requested Details Tab
      Details.elements.NetCashSurr().invoke('text').as('NetN2').then((val1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
         {
           expect(val2).to.include(val1.trim());
         })
      })

      //After Quoting Upon checking the checkbox Net Cash Surrender Value should reflect in Requested Details Tab
      Details.elements.NetCashSurrLab().invoke('text').as('NetL2').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //LoansTab:
      //User clicks on Loans Tab
      Details.Loans();

      //Explicit Wait
      cy.wait(5000)

      //Loans tab should display below message.....
      Details.elements.VARILoanScr().should('contain',' For this information, please go to Native system.')

    
      //Funds Tab:
      //User clicks on Funds Tab
      Details.Funds();

      //Explicit Wait
      cy.wait(9000)

      //Funds Tab Field Validation
      Details.elements.FundsU1VerPath().should('contain','Investment')
      .and('contain','Number').and('contain','Type').and('contain','Future Allocation')
      .and('contain','Interest Rate').and('contain','% Of Total Contract').and('contain','Total Value')

      //User clicks to open Invetment Statergy Popup
      Details.VARIPOPUP()

      //Popup tab should contain Option Label
      Details.elements.VARIINVPOP().should('contain',' Option: ')

      //Popup tab should contain Fund Number Label
      Details.elements.VARIINVPOP().should('contain',' Fund Number: ')

      //After viewing user clicks on close button
      Details.VARICloseBtn()

      ////User clicks on Fund Number Checkbox
      Details.FundNumChkBox()

      //Upon checking the checkbox Funds tab name should reflect in Requested Details Tab
      Details.elements.ReqDetTab().contains('FUNDS').should('be.visible'); 

      //Upon checking the checkbox Invstment Label should reflect in Requested Details Tab
      Details.elements.ReqDetFeiName().contains('Investment:').should('be.visible');

      //Upon checking the checkbox Number Label should reflect in Requested Details Tab
      Details.elements.ReqDetFeiName().contains('Number:').should('be.visible');

      //Upon checking the checkbox Number should reflect in Requested Details Tab
      Details.elements.FundNumLabel().invoke('text').as('FundNL').then((det1) =>
      {
        Details.elements.ReqDetFeiVal().invoke('text').should((det2) =>
        {
           expect(det2.trim()).to.include(det1.trim());
        })
      })

      //User clicks on Future Allocation Checkbox
      Details.FutAllocChkBox(); 

      //Upon checking the checkbox Future Allocation Label should reflect in Requested Details Tab
      Details.elements.ReqDetFeiName().contains('Future Allocation:').should('be.visible');

      //Upon checking the checkbox Future Allocation should reflect in Requested Details Tab
      Details.elements.FundAllocLabel().invoke('text').as('FundAL').then((det1) =>
      {
        Details.elements.ReqDetFeiVal().invoke('text').should((det2) =>
        {
           expect(det2.trim()).to.include(det1.trim());
        })
      })


      //Suspense Tab:
      //User clicks on Suspense tab
      Details.Suspense();

      //Explicit Wait
      cy.wait(6000);

      //Suspense tab should display below message.....
      Details.elements.VARISusScr().should('contain',' For this information, please go to Native system.')

      // Revolving Error:
      //User clicks on Revolving Error tab
      Details.Revolving();

      //Explicit Wait
      cy.wait(6000);

      //Revolving Error tab should display below message.....
      Details.elements.VARIRevScr().should('contain',' For this information, please go to Native system.')

      //Notes:
      //User clicks on Notes Tab
      Details.Notes();
      
      //Explicit Wait
      cy.wait(6000);

      //Notes tab should display below message.....
      Details.elements.VARINotesScr().should('contain',' For this information, please go to Native system.')

      //Pending Transactions
      //User clicks on Pending Transaction tab
      Details.PendingTran();

      //Explicit Wait
      cy.wait(6000);

      //Pending transaction tab should display below message.....
      Details.elements.VARIPenScr().should('contain',' For this information, please go to Native system.')

      cy.CloseCall(this.data.wrPHNUM)
})

Then('User should see the time in My Call History Widget', function()
{
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const NewYorkTimezone = dayjs.utc().tz("America/New_York").format("hh:mm")
  Details.elements.MyCallDate().should('contain',NewYorkTimezone)
})

Then('User should see the authorized policy in My Call History Widget', function()
{
  Details.elements.MyCallPolicy().should('contain',this.data.policy)
})


And("User should see the caller's reason in My Call History Widget", function()
{
  Details.elements.MyCallReason().should('contain',this.calldip)
})

And("User should see the today's date in My Call History Widget", function()
{
  const todaysDate = dayjs().format('MM/DD/YYYY')
  Details.elements.MyCallDate().should('contain',todaysDate).invoke('text').as('Time')
})


When('User enters the authorized policy', function()
{
  Details.elements.SearchPolicy().type(this.data.policy)         
})

And('User clicks on the Search Button', function()
{
  Details.SearchButton()
      cy.xpath('//span[@class="ng-star-inserted"]').then($el =>
      {
        console.log($el.text())
        if ($el.text() =="Search Results ")
         {
           cy.get('#_0__NAME').click()
           Details.elements.PolicyNumLabel().should('have.text',this.data.policy);
         }
         else
         {
          Details.elements.PolicyNumLabel().should('have.text',this.data.policy);
         }
      })     
})

Then('User should be able to see CSR Policy Page {string}', PolicyPage =>
{
  Details.elements.CSRPolicyPage().should('contain',PolicyPage)
})

When('User clicks on Call history Widget', function()
{
  Details.CallHistoryTab()
})

Then('The Name of the Authorized caller should be displayed in Call history Caller Name Label', function()
{
  Details.elements.Caname().should('contain',this.callername.trim())
})

And('The Role of the Authorized Caller should reflect in Call history Caller Role Label', function()
{
  Details.elements.Carole().should('contain',this.callerrole)
})

And('The Reason for which the caller called should reflect in Call history Caller Role Label', function()
{
  Details.elements.Careason().should('contain',this.calldip)
})

And('The time when call is closed should reflect in Call history Date Label', function()
{
  Details.elements.MyCallDate().should('contain',this.Time)
})

When('User clicks on the first record on Call history Widget', function()
{
  Details.elements.MyCallDate().should('contain',this.Time).click()
})

And('User should be able to see Call Details Widget', function()
{
  Details.elements.CallDetail().should('contain','Call Details')
})

Then('The Name of the Authorized caller should be displayed in Call Details Caller Name Label', function()
{
  cy.wait(10000)
  Details.elements.CallDetName().should('contain',this.callername.trim())
})

And('The Role of the Authorized Caller should reflect in Call Details Caller Role Label', function()
{
  Details.elements.Callrole().should('contain',this.callerrole)
})

And('The Reason for which the caller called should reflect in Call Details Caller Role Label', function()
{
  Details.elements.CallHisRea().should('contain',this.calldip)
})

And('The time when call is closed should reflect in Call Details Date Label', function()
{
  Details.elements.CallHisDateTime().should('contain',this.Time)
})

Then('User should be able to see {string} in Call Details Widget', TABNAMEONE =>
{
  Details.elements.CallHisTab().should('contain',TABNAMEONE)
})

And('User should be able to see Policy Number Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.PolN.trim())
})

And('User should be able to see Policy Number in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.PolL)
})

And('User should be able to see Issue Date Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.IssDN.trim())
})

And("User should be able to see Policy's Issue Date in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.IssDL)
})

And('User should be able to see Issue State Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.IssSN.trim())
})

And("User should be able to see Policy's Issue State in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.IssSL)
})

Then('User should be able to see {string} in Call Details Widget', TABNAMETWO =>
{
  Details.elements.CallHisTab().should('contain',TABNAMETWO)
})

Then('User should be able to see {string} in Call Details Widget', TABNAMEFOUR =>
{
  Details.elements.CallHisTab().should('contain',TABNAMEFOUR)
})

And('User should be able to see {string} in Call Details Widget', EffDT =>
{
  Details.elements.CallHisTab().should('contain',EffDT)
})

And("User should be able to see Today's Effective Date in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.eff1)
})

And('User should be able to see Face Amount Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FAN1.trim())
})

And('User should be able to see Face Amount in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FAL1)
})

And('User should be able to see Accumulated Cash Value Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.AccN1.trim())
})

And('User should be able to see Accumulated Cash Value in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.AccL1)
})

And("User should be able to see Net Cash Surrender Value Label in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.NetN1.trim())
})

And('User should be able to see Net Cash Surrender Value in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.NetL1)
})

And('User should be able to see Quoted Effective Date in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.eff2)
})

And('User should be able to see Quoted Face Amount Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FAN2.trim())
})

And("User should be able to see Quoted Face Amount in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.FAL2)
})

And('User should be able to see Quoted Accumulated Cash Value Label in Call Details Widget', function()
{ 
  Details.elements.CallHisTab().should('contain',this.AccN2.trim())
})

And("User should be able to see Quoted Accumulated Cash Value in Call Details Widget", function()
{ 
  Details.elements.CallHisTab().should('contain',this.AccL2)
})

And('User should be able to see Quoted Net Cash Surrender Value Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.NetN2.trim())
})

And("User should be able to see Quoted Net Cash Surrender Value in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.NetL2)
})

Then('User should be able to see {string} in Call Details Widget', TABNAMEFIVE =>
{
  Details.elements.CallHisTab().should('contain',TABNAMEFIVE)
})

And("User should be able to see Today's Effective Date in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.Leff1)
})

And('User should be able to see Max Loan Amount Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.MaxN1.trim())
})

And('User should be able to see Max Loan Amount in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.MaxL1)
})

And('User should be able to see Quoted Effective Date in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.Leff2)
})

And('User should be able to see Quoted Max Loan Amount Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.MaxN2.trim())
})

And("User should be able to see Quoted Max Loan Amount in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.MaxL2)
})

Then('User should be able to see {string} in Call Details Widget', TABNAMESIX =>
{
  Details.elements.CallHisTab().should('contain',TABNAMESIX)
})

And('User should be able to see {string} Label in Call Details Widget', NAMELABEL =>
{
  Details.elements.CallHisTab().should('contain',NAMELABEL)
})

And('User should be able to see {string} Label in Call Details Widget', NUMBERLABEL =>
{
  Details.elements.CallHisTab().should('contain',NUMBERLABEL)
})

And('User should be able to see Fund Number in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FundNL.trim())
})

And('User should be able to see {string} Label in Call Details Widget', FUTUREALLLABEL =>
{
  Details.elements.CallHisTab().should('contain',FUTUREALLLABEL)
})

And('User should be able to see Future Allocation in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FundAL.trim())
})








