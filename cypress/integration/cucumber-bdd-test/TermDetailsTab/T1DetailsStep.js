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
  cy.visit(Cypress.env('PILOT2'))
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
      .and('contain','Issue Date').and('contain','Maturity Expiry Date').and('contain','Tobacco Class Code')
      .and('contain','Version Name').and('contain','Issue State').and('contain','Orginating System')

      Details.elements.ProdNameLab().then($el =>
      {
        console.log($el.text());
        if ($el.text() == 'WHOLE LIFE') 
          {
            Details.elements.DetVerPath().invoke('text').should('contain','Modified Endowment Contract')
            .and('contain','MEC Date')
          } 
      })

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
      
      Details.elements.RiderScreen().then($el => 
      {
        console.log($el.text())
        if ($el.text() =="This Policy does not have any riders. ")
         {
           //User clicks on Message checkbox
            Details.RidersMsgChkBox();

            //Upon checking the checkbox Riders tab name should reflect in Requested Details Tab
            Details.elements.ReqDetTab().contains('RIDERS').should('be.visible')

            //Upon checking the checkbox Message should reflect in Requested Details Tab
            Details.elements.ReqDetFeiVal().contains(' This Policy does not have any riders').should('be.visible')
         } 
        else 
         {
          //Riders Tab Field Validation
          Details.elements.RidVerPath()
          .should('contain','Rider Name').and('contain','Amount').and('contain','Coverage Type')
          .and('contain','Covered Name').and('contain','Status').and('contain','Effective Date')

          //User clicks on Details Tab
          Details.Details()

          //Explicit Wait
          cy.wait(1000)

          Details.elements.ProdNameLab().then($el =>
            {
              console.log($el.text());
              if ($el.text() == 'TERM') 
                {
                  //User clicks on Riders Tab
                  Details.Riders();

                  //Explicit Wait
                  cy.wait(1000)

                  Details.elements.RidVerPath().should('contain','Termination Date')
                  .and('contain','Rider Modal').and('contain','Death Benefit Amount Indicator')
                } 
              else
                {
                  //User clicks on Riders Tab
                  Details.Riders();
                }
            })

          //User checks Coverage Plan checkbox
          Details.CovPlanChkBox();

          //Upon checking the checkbox Riders tab name should reflect in Requested Details Tab
          Details.elements.ReqDetTab().contains('RIDERS').should('be.visible')

          //Upon checking the checkbox Coverage Plan Label should reflect in Requested Details Tab
          Details.elements.CovPlan().invoke('text').as('CovpN').then((det1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
            {
              expect(det2).to.include(det1.trim());
            })
          })

          //Upon checking the checkbox Coverage Plan should reflect in Requested Details Tab
          Details.elements.CovPlanLabel().invoke('text').as('CovpL').then((rid1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
          })

          //User checks Coverage Name checkbox
          Details.CovNameChkBox();

          //Upon checking the checkbox Coverage Name Label should reflect in Requested Details Tab
          Details.elements.CovName().invoke('text').as('CovnN').then((det1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
            {
              expect(det2).to.include(det1.trim());
            })
          })

          //Upon checking the checkbox Coverage Name should reflect in Requested Details Tab
          Details.elements.CovNameLabel().invoke('text').as('CovnL').then((rid1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
          })

          //User checks Coverage Party Name checkbox
          Details.CovParNameChkBox();

          //Upon checking the checkbox Coverage Party Name Label should reflect in Requested Details Tab
          Details.elements.CovParName().invoke('text').as('CovpaN').then((det1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
            {
              expect(det2).to.include(det1.trim());
            })
          })

          //Upon checking the checkbox Coverage Party Name should reflect in Requested Details Tab
          Details.elements.CovParNameLabel().invoke('text').as('CovpaL').then((rid1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
          })
         }    
      })

      //Billing Tab:
      //User clicks on Billing Tab
      Details.Billing();

      //Explicit Wait
      cy.wait(5000)

      //Billing Tab Data Validation 
      Details.elements.BillVerPath().should('contain','Paid To Date').and('contain','Billing Method')
      .and('contain','Billing Frequency').and('contain','Billing Amount').and('contain','Total Premium Paid')
      .and('contain','Annual Premium').and('contain','Accelerated Payment Indicator')

      Details.elements.BillOptLabel().then($el =>
        {
          console.log($el.text());
          if ($el.text() == 'I - Individual') 
            {
              Details.elements.BillVerPath().should('contain','List Bill #')
            } 

          else if($el.text() == 'P - PAC')
          {
            Details.elements.BillVerPath().should('contain','Draft Day')
            .and('contain','Account Holder Name').and('contain','Bank Name').and('contain','Account Number')
            .and('contain','Account Type').and('contain','Routing /Transit Number')
          }
        })

      //User clicks on Billing Option Checkbox
      Details.BillOptChkBox();

      //Upon checking the checkbox Billing tab name should reflect in Requested Details Tab
      Details.elements.ReqDetTab().contains('BILLING').should('be.visible')

      //Upon checking the checkbox Billing Option Label should reflect in Requested Details Tab
      Details.elements.BillOpt().invoke('text').as('BiON').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })

      //Upon checking the checkbox Billing Option should reflect in Requested Details Tab
      Details.elements.BillOptLabel().invoke('text').as('BiOL').then((bil1) =>
      {
        Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
      })

      //User clicks on Billig Amount Checkbox
      Details.BillAmtChkBox();

      //Upon checking the checkbox Billing Amount Label should reflect in Requested Details Tab
      Details.elements.BillAmt().invoke('text').as('BiAmN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })

      //Upon checking the checkbox Billing Amount should reflect in Requested Details Tab
      Details.elements.BillAmtLabel().invoke('text').as('BiAmL').then((bil1) =>
      {
        Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
      })

      //User clicks on Total Premium CheckBox 
      Details.TotalPrmChkBox();

      //Upon checking the checkbox Total Premium Label should reflect in Requested Details Tab
      Details.elements.TotalPrm().invoke('text').as('TotPN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })

      //Upon checking the checkbox Total Premium should reflect in Requested Details Tab
      Details.elements.TotalPrmLabel().invoke('text').as('TotPL').then((bil1) =>
      {
        Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
      })
        
      //Values Tab:
      //User clicks on Values Tab
      Details.Values()

      //Explicit Wait
      cy.wait(5000)

      //Values Tab Field Validation
      Details.elements.ValuesVerPath().should('contain','Message').and('contain','Face Amount')
      Details.elements.ValuesTotReinP().should('contain','Total Reinstatement Amount')

      //User clicks on Face Amount Checkbox
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
      Details.elements.FaceAmt().invoke('text').as('FAN1').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })

      //Upon checking the checkbox Face Amount should reflect in Requested Details Tab
      Details.elements.FaceAmtLabel().invoke('text').as('FAL1').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //User clicks on Calender Icon
      Details.CallIcon()

      //User clicks on Month and Year Button
      Details.ChooseMnYr()

      //User selects year
      Details.elements.CalBody().each(($el)=>
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
      Details.elements.FaceAmt().invoke('text').as('FAN2').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })

      //After Quoting Upon checking the checkbox Face Amount should reflect in Requested Details Tab
      Details.elements.FaceAmtLabel().invoke('text').as('FAL2').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //LoansTab:
      //User clicks on Loans Tab
      Details.Loans();

      //Explicit Wait
      cy.wait(5000)

      //User clicks on Loans Checkbox 
      Details.LoanMsgChkBox();

      //Upon checking the checkbox Loan Label should reflect in Requested Details Tab
      Details.elements.LoanReqDet().contains('LOAN').should('be.visible')

      //Upon checking the checkbox Message should reflect in Requested Details Tab
      Details.elements.LoanMsg().contains('Loans not applicable for this product').should('be.visible')
    
      //Funds Tab:
      //User clicks on Funds Tab
      Details.Funds();

      //Explicit Wait
      cy.wait(5000)

      //User clicks on Funds Checkbox 
      Details.FundsMsgChkBox();

      //Upon checking the checkbox Funds Label should reflect in Requested Details Tab
      Details.elements.FundReqDet().contains('FUNDS').should('be.visible')

      //Upon checking the checkbox Message should reflect in Requested Details Tab
      Details.elements.ReqDetFeiVal().contains(' Funds not applicable for this product').should('be.visible')
      
      //Suspense Tab:
      //User clicks on Suspense tab
      Details.Suspense();

      //Explicit Wait
      cy.wait(6000);

      Details.elements.Suspscreen().then($el =>
      {
        console.log($el.text());
        if ($el.text() == ' No records found.') 
        {
          //User clicks on Revolving Error Tab
          Details.Revolving();
        } 
        else
        {
          //User clicks on 1st field checkbox in Suspense Tab
          Details.SuspenseChkBox();

          //Upon checking on the checkbox Suspense Tab name should reflect in Requested Details Tab
          Details.elements.ReqDetTab().contains('Suspense').should('be.visible')

          //Upon checking on the checkbox Amount Label should reflect in Requested Details Tab
          Details.elements.ReqDetFeiName().should('contain','Amount:')

          //Upon checking on the checkbox Amount should reflect in Requested Details Tab
          Details.elements.SusAmtLabel().invoke('text').as('suspenseAmt').then((sus1) =>
          {
            Details.elements.ReqDetFeiVal().contains(sus1).should('be.visible')
          })

          //Upon checking on the checkbox Effective Date Label should reflect in Requested Details Tab
          Details.elements.ReqDetFeiName().should('contain','Effective Date:')

          //Upon checking on the checkbox Effective Date should reflect in Requested Details Tab
          Details.elements.SusEffDatLabel().invoke('text').as('SusEffectiveDate').then((sus1) =>
          {
            Details.elements.ReqDetFeiVal().contains(sus1).should('be.visible')
          })

          //User clicks on Revolving Error Tab
          Details.Revolving();
        }    
       })

      // Revolving Error:
      //Explicit Wait
      cy.wait(6000);

      Details.elements.RevErrScreen().then($el => 
      {
        console.log($el.text());
        if ($el.text() == ' No records found.')
        {
          //User clicks on Notes Tab
          Details.Notes();
        } 
        else
        {
          //User clicks on 1st field checkbox of Revolving Error Tab
          Details.RevolvChkBox();

          //Upon checking on the checkbox Revolving Error Tab name should reflect in Requested Details Tab
          Details.elements.ReqDetTab().contains('Revolving Error').should('be.visible')

          //Upon checking on the checkbox Type Label should reflect in Requested Details Tab
          Details.elements.ReqDetFeiName().should('contain','Type:')

          //Upon checking on the checkbox Type should reflect in Requested Details Tab
          Details.elements.RevolTypeLabel().invoke('text').as('RevTy').then((rev1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rev1).should('be.visible')
          })

          //Upon checking on the checkbox Effective Date Label should reflect in Requested Details Tab
          Details.elements.ReqDetFeiName().should('contain','Effective Date:')

          //Upon checking on the checkbox Effective Date should reflect in Requested Details Tab
          Details.elements.RevolEffDtLabel().invoke('text').as('RevEff').then((rev1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rev1).should('be.visible')
          })

          //Upon checking on the checkbox Amount Label should reflect in Requested Details Tab
          Details.elements.ReqDetFeiName().should('contain','Amount:')

          //Upon checking on the checkbox Amount should reflect in Requested Details Tab
          Details.elements.RevolAmtLabel().invoke('text').as('RevAmt').then((rev1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rev1).should('be.visible')
          })

          //User clicks on Notes Tab
          Details.Notes();
        }    
      })

      //Notes:
      //Explicit Wait
      cy.wait(6000);

      Details.elements.NotesScreen().then($el => 
      {
        console.log($el.text());
        if ($el.text() == ' No records found.') 
        {
          //User clicks on Pending Transaction Tab
          Details.PendingTran();

          //Pending Transaction should contain following message
          Details.elements.PendingTranLab().should('contain',' No records found.');
        } 
        else
        {
          //Notes Tab Field Validation
          Details.elements.NotesVerPath().should('contain','Message').and('contain','Operator ID')
          .and('contain','Note Type').and('contain','Type Number').and('contain','Date')

          //User clicks on Notes Type checkbox
          Details.NotesTypeChkBox();

          //Upon checking on the checkbox Notes Tab name should reflect in Requested Details Tab
          Details.elements.ReqDetTab().contains('NOTES').should('be.visible')

          //Upon checking on the checkbox Type Label should reflect in Requested Details Tab
          Details.elements.NotesType().invoke('text').as('NotN').then((not1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((not2) =>
            { 
               expect(not2).to.include(not1.trim());
            })
          })

          //Upon checking on the checkbox Type should reflect in Requested Details Tab
          Details.elements.NotesTypeLabel().invoke('text').as('NotL').then((not1) =>
          {
            Details.elements.ReqDetFeiVal().contains(not1).should('be.visible')
          })

          //User clicks on Notes Type Number Checkbox 
          Details.NotesTypeNoChkBox()
          
          //Upon checking on the checkbox Number Label should reflect in Requested Details Tab
          Details.elements.NotesTypeNo().invoke('text').as('NotTyN').then((not1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((not2) =>
            { 
               expect(not2).to.include(not1.trim());
            })
          })

          //Upon checking on the checkbox Number should reflect in Requested Details Tab
          Details.elements.NotesTypeNoLabel().invoke('text').as('NotTyL').then((not1) =>
          {
            Details.elements.ReqDetFeiVal().contains(not1).should('be.visible')
          }) 

          //User clicks on Pending Transactions Tab
          Details.PendingTran();

          //Pending Transaction should contain following message
          Details.elements.PendingTranLab().should('contain',' No records found.');
        }    
      })

      //User closes the call
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

And("User should be able to see the fields that are checked in Rider tab in Call Details Widget", function()
{
  Details.elements.CallHisTab().then(($body) =>
  {
    if($body.text().includes('Rider Name')) 
    {
      Details.elements.CallHisTab().should('contain',this.CovpL)
      Details.elements.CallHisTab().should('contain',this.CovnN.trim())
      Details.elements.CallHisTab().should('contain',this.CovnL)
      Details.elements.CallHisTab().should('contain',this.CovpaN.trim())
      Details.elements.CallHisTab().should('contain',this.CovpaL)
    } 
    else 
    {
      Details.elements.CallHisTab().should('contain','This Policy does not have any riders')
    }
  })
})

Then('User should be able to see {string} in Call Details Widget', TABNAMETHREE =>
{
  Details.elements.CallHisTab().should('contain',TABNAMETHREE)
})

And('User should be able to see Billing Option Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.BiON.trim())
})

And('User should be able to see Billing Option in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.BiOL)
})

And('User should be able to see Billing Amount Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.BiAmN.trim())
})

And("User should be able to see Billing Amount in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.BiAmL)
})

And('User should be able to see Total premium Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.TotPN.trim())
})

And('User should be able to see Total Premium in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.TotPL)
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


Then('User should be able to see {string} in Call Details Widget', TABNAMEFIVE =>
{
  Details.elements.CallHisTab().should('contain',TABNAMEFIVE)
})

And('User should be able to see Loan tab Message {string} in Call Details Widget', LOANMESSAGE =>
{
  Details.elements.CallHistLoanMsg().should('contain',LOANMESSAGE)
})

Then('User should be able to see {string} in Call Details Widget', TABNAMESIX =>
{
  Details.elements.CallHisTab().should('contain',TABNAMESIX)
})

And('User should be able to see Funds tab Message {string} in Call Details Widget', FUNDSMESSAGE =>
{
  Details.elements.CallHistLoanMsg().should('contain',FUNDSMESSAGE)
})

Then('User should be able to see the fields when they are checked in Suspense tab in Call Details Widget', function()
{
  Details.elements.CallHisTab().then(($body) =>
      {
        if($body.text().includes('SUSPENSE')) 
        {
          Details.elements.CallHisTab().should('contain','Amount')
          Details.elements.CallHisTab().should('contain',this.suspenseAmt)
          Details.elements.CallHisTab().should('contain','Effective Date')
          Details.elements.CallHisTab().should('contain',this.SusEffectiveDate)
        } 
      })
})

Then('User should be able to see the fields when they are checked in Revolving Error tab in Call Details Widget', function()
{
  Details.elements.CallHisTab().then(($body) =>
      {
        if($body.text().includes('REVOLVING ERROR')) 
        {
          Details.elements.CallHisTab().should('contain','Type')
          Details.elements.CallHisTab().should('contain',this.RevTy)
          Details.elements.CallHisTab().should('contain','Effective Date')
          Details.elements.CallHisTab().should('contain',this.RevEff)
          Details.elements.CallHisTab().should('contain','Amount')
          Details.elements.CallHisTab().should('contain',this.RevAmt)
        } 
      })
})

Then('User should be able to see the fields when they are checked in Notes tab in Call Details Widget', function()
{
  Details.elements.CallHisTab().then(($body) =>
      {
        if($body.text().includes('NOTES')) 
        {
          Details.elements.CallHisTab().should('contain',this.NotN.trim())
          Details.elements.CallHisTab().should('contain',this.NotL)
          Details.elements.CallHisTab().should('contain',this.NotTyN.trim())
          Details.elements.CallHisTab().should('contain',this.NotTyL)
        } 
      })
})





