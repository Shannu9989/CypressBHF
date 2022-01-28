import {Given,When,Then,And} from 'cypress-cucumber-preprocessor/steps'
import Details, { } from './Details';
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
      Details.AnnRidOneChkBox();
      Details.elements.ReqDetTab().contains('RIDERS').should('be.visible')
      Details.elements.AnnRidone().invoke('text').then((rid1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((rid2) =>
        {
           expect(rid2).to.include(rid1.trim());
        })
      })
      Details.elements.AnnRidoneLabel().invoke('text').as('RidOL').then((rid1) =>
      {
        Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
      })
      

      cy.xpath('//span[text()="Riders"]//following::span[@class="rd-checkbox-label"][2]').then($rid =>
      {
        if($rid.text() == "Death Benefit Option:")
        {
          Details.AnnRidTwoChkBox();
          Details.elements.AnnRidTwo().invoke('text').then((rid1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((rid2) =>
            {
              expect(rid2).to.include(rid1.trim());
            })
          })
          cy.xpath('//span[@class="pad-lAr0px p-l-34px textWrap ng-star-inserted"][1]').invoke('text').as('DBRL').then((rid1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
          })
        }
        else
        {
          Details.AnnRidTwoChkBox();
          Details.elements.AnnRidTwo().invoke('text').then((rid1) =>
          {
            Details.elements.ReqDetFeiName().invoke('text').should((rid2) =>
            {
              expect(rid2).to.include(rid1.trim());
            })
          })
          cy.xpath('//span[text()="Riders"]//following::span[@class=" pad-lAr0px p-l-34px textWrap"][1]').invoke('text').as('LRL').then((rid1) =>
          {
            Details.elements.ReqDetFeiVal().contains(rid1).should('be.visible')
          })
        }
      })

      Details.AnnRidThreeChkBox();
      Details.elements.AnnRidThree().invoke('text').then((rid1) =>
      {
        Details.elements.ReqDetFeiName().invoke('text').should((rid2) =>
        {
          expect(rid2).to.include(rid1.trim());
        })
      })
      Details.elements.AnnRidThreeLabel().invoke('text').as('RidTHL').then((rid1) =>
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
  Details.elements.BillOpt().invoke('text').as('BiON').then((bil1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((bil2) =>
     {
       expect(bil2).to.include(bil1.trim());
     })
  })
  Details.elements.BillOptLabel().invoke('text').as('BiOL').then((bil1) =>
  {
    Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
  })

  Details.BillAmtChkBox();
  Details.elements.BillAmt().invoke('text').as('BiAmN').then((bil1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((bil2) =>
     {
       expect(bil2).to.include(bil1.trim());
     })
  })
  Details.elements.BillAmtLabel().invoke('text').as('BiAmL').then((bil1) =>
  {
    Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
  })

  Details.TotalPrmChkBox();
  Details.elements.TotalPrm().invoke('text').as('TotPN').then((bil1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((bil2) =>
     {
       expect(bil2).to.include(bil1.trim());
     })
  })
  Details.elements.TotalPrmLabel().invoke('text').as('TotPL').then((bil1) =>
  {
    Details.elements.ReqDetFeiVal().contains(bil1).should('be.visible')
  })
    
  //Values Tab:
  Details.Values()
  cy.wait(5000)
  Details.AcccashChkBox();
  Details.elements.ReqDetTab().contains('VALUES').should('be.visible')
  Details.elements.ReqDetFeiName().should('contain','Effective Date:')
  Details.elements.Valeffdt().invoke('val').as('eff1').then((val1) =>
  {
    Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
  })
  Details.elements.AcccashVal().invoke('text').as('AccN1').then((val1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
     {
       expect(val2).to.include(val1.trim());
     })
  })
  Details.elements.AcccashValLabel().invoke('text').as('AccL1').then((val1) =>
  {
    Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
  })

  Details.NetCashSurrChkBox();
  Details.elements.NetCashSurr().invoke('text').as('NetN1').then((val1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
     {
       expect(val2).to.include(val1.trim());
     })
  })
  Details.elements.NetCashSurrLab().invoke('text').as('NetL1').then((val1) =>
  {
    Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
  })

  Details.FreeOutAmtChkBox();
  Details.elements.FreeOutAmt().invoke('text').as('FOAN1').then((val1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
     {
       expect(val2).to.include(val1.trim());
     })
  })
  Details.elements.FreeOutAmtLab().invoke('text').as('FOAL1').then((val1) =>
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
      if(Date=='15')
      {
        cy.wrap($el).click({force: true})
      }
  })

  Details.ButtonQuote()
  cy.wait(15000)
  Details.AcccashChkBox();
  Details.elements.ReqDetTab().contains('VALUES').should('be.visible')
  Details.elements.ReqDetFeiName().should('contain','Effective Date:')
  Details.elements.Valeffdt().invoke('val').as('eff2').then((val1) =>
  {
    Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
  })
  Details.elements.AcccashVal().invoke('text').as('AccN2').then((val1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
     {
       expect(val2).to.include(val1.trim());
     })
  })
  Details.elements.AcccashValLabel().invoke('text').as('AccL2').then((val1) =>
  {
    Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
  })

  Details.NetCashSurrChkBox();
  Details.elements.NetCashSurr().invoke('text').as('NetN2').then((val1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
     {
       expect(val2).to.include(val1.trim());
     })
  })
  Details.elements.NetCashSurrLab().invoke('text').as('NetL2').then((val1) =>
  {
    Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
  })

  Details.FreeOutAmtChkBox();
  Details.elements.FreeOutAmt().invoke('text').as('FOAN2').then((val1) =>
  {
    Details.elements.ReqDetFeiName().invoke('text').should((val2) =>
     {
       expect(val2).to.include(val1.trim());
     })
  })
  Details.elements.FreeOutAmtLab().invoke('text').as('FOAL2').then((val1) =>
  {
    Details.elements.ReqDetFeiVal().contains(val1).should('be.visible')
  })

  //LoansTab:
  Details.Loans();
  cy.wait(5000)
  Details.NoLoanChkBox();
  Details.elements.ReqDtAnnLoanMsg().contains('Loans not applicable for this product').should('be.visible')
  


  //Funds Tab:
  Details.Funds();
  cy.wait(9000)
  Details.AnnFundNoChkBox();
  Details.elements.ReqDetTab().contains('FUNDS').should('be.visible'); 
  Details.elements.ReqDetFeiName().contains('Name:').should('be.visible');
  Details.elements.ReqDetFeiName().contains('Number:').should('be.visible');
  Details.elements.Annlabelone().invoke('text').as('FundOL').then((fun1) =>
  {
    Details.elements.ReqDetFeiVal().invoke('text').should((fun2) =>
     {
       expect(fun2.trim()).to.include(fun1);
     })
  })
  Details.AnnSecFieldChkBox()
  Details.elements.ReqDetFeiName().should(($el) =>
  {
    const tex = $el.text()
    const hastxt = tex.includes('Future Allocation:')
    const hadtxt = tex.includes('Type:')
    expect(hastxt || hadtxt,'ele has either of the txt').to.be.true
  })
  Details.elements.Annlabeltwo().invoke('text').as('FundTL').then((fun1) =>
  {
    Details.elements.ReqDetFeiVal().invoke('text').should((fun2) =>
     {
       expect(fun2.trim()).to.include(fun1);
     })
  })
  Details.AnnThirdfieldChkBox(); 
  Details.elements.ReqDetFeiName().should(($el) =>
  {
    const tex = $el.text()
    const hastxt = tex.includes('Total Contract Value:')
    const hadtxt = tex.includes('Unit Value:')
    expect(hastxt || hadtxt,'ele has either of the txt').to.be.true
  })
  Details.elements.Annlabelthree().invoke('text').as('FundThL').then((fun1) =>
  {
    Details.elements.ReqDetFeiVal().invoke('text').should((fun2) =>
     {
       expect(fun2.trim()).to.include(fun1);
     })
  })

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
    }    
  })


  //Pending Transaction
  cy.wait(6000);
  cy.xpath('//span[text()="Pending Transactions"]//following::mat-card-content[@class="mat-card-content ng-star-inserted"][2]').should(($el) =>
  {
    const tex = $el.text()
    const hastxt = tex.includes(' No records found.')
    const hadtxt = tex.includes(' User ID ')
    expect(hastxt || hadtxt,'ele has either of the txt').to.be.true
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
    if($body.text().includes('LIVING RIDERS')) 
    {
      Details.elements.CallHisTab().should('contain','Rider Name')
      Details.elements.CallHisTab().should('contain',this.RidOL)
      Details.elements.CallHisTab().should('contain','Rider Status')
      Details.elements.CallHisTab().should('contain',this.LRL)
      Details.elements.CallHisTab().should('contain','Rider Version')
      Details.elements.CallHisTab().should('contain',this.RidTHL)
    } 

    else if($body.text().includes('DEATH RIDERS'))
    {
      Details.elements.CallHisTab().should('contain','Death Benefit Indicator')
      Details.elements.CallHisTab().should('contain',this.RidOL)
      Details.elements.CallHisTab().should('contain','Death Benefit Value')
      Details.elements.CallHisTab().should('contain',this.DBRL)
      Details.elements.CallHisTab().should('contain','Death Benefit Option')
      Details.elements.CallHisTab().should('contain',this.RidTHL)
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

And('User should be able to see Free out Amount Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FOAN1.trim())
})

And('User should be able to see Free out Amount in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FOAL1)
})

And('User should be able to see Quoted Effective Date in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.eff2)
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

And('User should be able to see Quoted Free out Amount Label in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FOAN2.trim())
})

And("User should be able to see Quoted Free out Amount in Call Details Widget", function()
{
  Details.elements.CallHisTab().should('contain',this.FOAL2)
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
  Details.elements.CallHisTab().should('contain',this.FundOL)
})

And("User should be able to see Type or Future Allocation Label in Call Details Widget", function()
{
  Details.elements.CallHisTab().should(($el) =>
      {
        const tex = $el.text()
        const hastxt = tex.includes('Type')
        const thistxt = tex.includes('Future Allocation')
        expect(hastxt || thistxt,'ele has either of the txt').to.be.true
      })
})

And('User should be able to see Type or Future Allocation in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FundTL)
})

And("User should be able to see Total Contract or Unit Value Label in Call Details Widget", function()
{
  Details.elements.CallHisTab().should(($el) =>
      {
        const tex = $el.text()
        const hastxt = tex.includes('Total Contract Value')
        const thistxt = tex.includes('Unit Value')
        expect(hastxt || thistxt,'ele has either of the txt').to.be.true
      })
})

And('User should be able to see Total Contract or Unit Value in Call Details Widget', function()
{
  Details.elements.CallHisTab().should('contain',this.FundThL)
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





