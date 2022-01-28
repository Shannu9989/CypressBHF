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
   //cy.xpath('//mat-panel-title[text()=" Policy Details "]').click()
      //Details Tab
      cy.wait(10000)
      Details.PolicyNoChkBox();
      Details.elements.ReqDetTab().contains('DETAILS').should('be.visible')
      Details.elements.PolicyNo().invoke('text').as('PolN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
         {
           expect(det2).to.include(det1.trim());
         })
      })
      Details.elements.PolicyNoLabel().invoke('text').as('PolL').then((dt2) =>
      {
        Details.elements.ReqDetFeiVal().contains(dt2).should('be.visible')
      })

      Details.IssDteChkBox();
      Details.elements.IssDate().invoke('text').as('IssDN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
         {
           expect(det2).to.include(det1.trim());
         })
      })
      Details.elements.IssDateLabel().invoke('text').as('IssDL').then((dt2) =>
      {
        Details.elements.ReqDetFeiVal().contains(dt2).should('be.visible')
      })

      Details.IssStateChkBox();
      Details.elements.IssState().invoke('text').as('IssSN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
         {
           expect(det2).to.include(det1.trim());
         })
      })
      Details.elements.IssStateLabel().invoke('text').as('IssSL').then((dt2) =>
      {
        Details.elements.ReqDetFeiVal().contains(dt2).should('be.visible')
      })

      //Riders Tab
      Details.Riders();
      cy.wait(6000)
      
      cy.xpath('//span[text()="Riders"]//following::span[12]').then($el => 
      {
        console.log($el.text())
        if ($el.text() =="This Policy does not have any riders. ")
         {
            Details.RidersMsgChkBox();
            Details.elements.ReqDetTab().contains('RIDERS').should('be.visible')
            Details.elements.ReqDetFeiVal().contains(' This Policy does not have any riders').should('be.visible')
         } 
        else 
         {
          Details.CovPlanChkBox();
          Details.elements.ReqDetTab().contains('RIDERS').should('be.visible')
          Details.elements.CovPlan().invoke('text').as('CovpN').then((det1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
            {
              expect(det2).to.include(det1.trim());
            })
          })
          Details.elements.CovPlanLabel().invoke('text').as('CovpL').then((rid1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
          })

          Details.CovNameChkBox();
          Details.elements.CovName().invoke('text').as('CovnN').then((det1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
            {
              expect(det2).to.include(det1.trim());
            })
          })
          Details.elements.CovNameLabel().invoke('text').as('CovnL').then((rid1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
          })

          Details.CovParNameChkBox();
          Details.elements.CovParName().invoke('text').as('CovpaN').then((det1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
            {
              expect(det2).to.include(det1.trim());
            })
          })
          Details.elements.CovParNameLabel().invoke('text').as('CovpaL').then((rid1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
          })
         }    
      })

      //Billing Tab:
      Details.Billing();
      cy.wait(5000)
      Details.BillOptChkBox();
      Details.elements.ReqDetTab().contains('BILLING').should('be.visible')
      Details.elements.BillOpt().invoke('text').as('BiON').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })
      Details.elements.BillOptLabel().invoke('text').as('BiOL').then((bil1) =>
      {
        Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
      })

      Details.BillAmtChkBox();
      Details.elements.BillAmt().invoke('text').as('BiAmN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })
      Details.elements.BillAmtLabel().invoke('text').as('BiAmL').then((bil1) =>
      {
        Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
      })

      Details.TotalPrmChkBox();
      Details.elements.TotalPrm().invoke('text').as('TotPN').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })
      Details.elements.TotalPrmLabel().invoke('text').as('TotPL').then((bil1) =>
      {
        Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
      })
        
      //Values Tab:
      Details.Values()
      cy.wait(5000)
      Details.FaceAmtChkBox();
      Details.elements.ReqDetTab().contains('VALUES').should('be.visible')
      Details.elements.ReqDetFeiName().should('contain','Effective Date:')
      Details.elements.Valeffdt().invoke('val').as('eff1').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })
      Details.elements.FaceAmt().invoke('text').as('FAN1').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })
      Details.elements.FaceAmtLabel().invoke('text').as('FAL1').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      cy.get('#policy-values-quote-effective-date-date_toggleDate .mat-icon-button').click({force: true})
      cy.get('[aria-label="Choose month and year"]').click({force: true})
      cy.get('.mat-calendar-body-cell-content').each(($el)=>
      {
          var Year =$el.text()
          if(Year=='2021')
          {
            cy.wrap($el).click({force: true})
          }
      })
      cy.get('.mat-calendar-body-cell-content').each(($el)=>
      {
          var Month =$el.text()
          if(Month=='DEC')
          {
            cy.wrap($el).click({force: true})
          }
      })
      cy.get('.mat-calendar-body-cell-content').each(($el)=>
      {
          var Date =$el.text()
          if(Date=='12')
          {
            cy.wrap($el).click({force: true})
          }
      })

      Details.ButtonQuote()
      cy.wait(10000)
      Details.FaceAmtChkBox();
      Details.elements.ReqDetFeiName().should('contain','Effective Date:')
      Details.elements.Valeffdt().invoke('val').as('eff2').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })
      Details.elements.FaceAmt().invoke('text').as('FAN2').then((det1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((det2) =>
        {
           expect(det2).to.include(det1.trim());
        })
      })
      Details.elements.FaceAmtLabel().invoke('text').as('FAL2').then((val1) =>
      {
        Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
      })

      //LoansTab:
      Details.Loans();
      cy.wait(5000)
      Details.LoanMsgChkBox();
      Details.elements.LoanReqDet().contains('LOAN').should('be.visible')
      Details.elements.LoanMsg().contains('Loans not applicable for this product').should('be.visible')
    
      //Funds Tab:
      Details.Funds();
      cy.wait(5000)
      Details.FundsMsgChkBox();
      Details.elements.FundReqDet().contains('FUNDS').should('be.visible')
      Details.elements.ReqDetFeiVal().contains(' Funds not applicable for this product').should('be.visible')
      


      //Suspense Tab:
      Details.Suspense();
      cy.wait(6000);
      cy.xpath('//span[text()="Suspense"]//following::mat-card-content[@class="mat-card-content ng-star-inserted"][2]').then($el =>
      {
        console.log($el.text());
        if ($el.text() == ' No records found.') 
        {
          Details.Revolving();
        } 
        else
        {
          Details.SuspenseChkBox();
          Details.elements.ReqDetTab().contains('Suspense').should('be.visible')
          Details.elements.ReqDetFeiName().should('contain','Amount:')
          Details.elements.SusAmtLabel().invoke('text').as('suspenseAmt').then((sus1) =>
          {
            Details.elements.ReqDetFeiVal().contains(sus1).should('be.visible')
          })
          Details.elements.ReqDetFeiName().should('contain','Effective Date:')
          Details.elements.SusEffDatLabel().invoke('text').as('SusEffectiveDate').then((sus1) =>
          {
            Details.elements.ReqDetFeiVal().contains(sus1).should('be.visible')
          })
          Details.Revolving();
        }    
       })

      // Revolving Error:
      cy.wait(6000);
      cy.xpath('//span[text()="Revolving Error"]//following::mat-card-content[@class="mat-card-content ng-star-inserted"][2]').then($el => 
      {
        console.log($el.text());
        if ($el.text() == ' No records found.')
        {
          Details.Notes();
        } 
        else
        {
          Details.RevolvChkBox();
          Details.elements.ReqDetTab().contains('Revolving Error').should('be.visible')
          Details.elements.ReqDetFeiName().should('contain','Type:')
          Details.elements.RevolTypeLabel().invoke('text').as('RevTy').then((rev1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rev1).should('be.visible')
          })
          Details.elements.ReqDetFeiName().should('contain','Effective Date:')
          Details.elements.RevolEffDtLabel().invoke('text').as('RevEff').then((rev1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rev1).should('be.visible')
          })
          Details.elements.ReqDetFeiName().should('contain','Amount:')
          Details.elements.RevolAmtLabel().invoke('text').as('RevAmt').then((rev1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rev1).should('be.visible')
          })
          Details.Notes();
        }    
      })

      //Notes:
      cy.wait(6000);
      cy.xpath('//span[text()="Notes"]//following::mat-card-content[@class="mat-card-content ng-star-inserted"][2]').then($el => 
      {
        console.log($el.text());
        if ($el.text() == ' No records found.') 
        {
          Details.PendingTran();
        } 
        else
        {
          Details.NotesTypeChkBox();
          Details.elements.ReqDetTab().contains('NOTES').should('be.visible')
          Details.elements.NotesType().invoke('text').as('NotN').then((not1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((not2) =>
            { 
               expect(not2).to.include(not1.trim());
            })
          })
          Details.elements.NotesTypeLabel().invoke('text').as('NotL').then((not1) =>
          {
            Details.elements.ReqDetFeiVal().contains(not1).should('be.visible')
          })

          Details.NotesTypeNoChkBox()
          
          Details.elements.NotesTypeNo().invoke('text').as('NotTyN').then((not1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((not2) =>
            { 
               expect(not2).to.include(not1.trim());
            })
          })
          Details.elements.NotesTypeNoLabel().invoke('text').as('NotTyL').then((not1) =>
          {
            Details.elements.ReqDetFeiVal().contains(not1).should('be.visible')
          }) 
          Details.PendingTran();
          Details.elements.PendingTranLab().should('contain',' No records found.');
        }    
      })

      cy.CloseCall(this.data.wrPHNUM)
})

Then('User should see the time in My Call History Widget', function()
{
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const NewYorkTimezone = dayjs.utc().tz("America/New_York").format("hh:mm")
  Details.elements.MyCallDate().should('contain',NewYorkTimezone)
})

And('User should see the authorized policy in My Call History Widget', function()
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





