class Details 
{
    elements = {

        //Login Page:
        UserName:         () => cy.get("#authUsername"),   
        Password:         () => cy.get("#authPassword"),
        LoginBu:          () => cy.get('#loginBtn'),
        LoginMessage:     () => cy.get('div[class="toast-message"]'),
        SearchPolicy:     () => cy.get("#contracts-collection-search-text"),
        SearchBut:        () => cy.get('.mat-form-field-suffix'),


        //Customer Identity Widget
        CSRPolicyPage:    () => cy.get('.logoTxt'),
        PolicyNumLabel:   () => cy.get('#selected-roles-policy-number-label'),
        AuthorizeBut:     () => cy.get('#authorize-undefined-button'),
        AutLabPolNum:     () => cy.get('#authorize-sucess-policy-number-label'),
        FullNameLab:      () => cy.get('#selected-roles-full-name-label'),
        AutLabFullNam:    () => cy.get('#authorize-sucess-full-name-label'),
        RoleLabel:        () => cy.get('#selected-roles-role-label'),
        AutLabRole:       () => cy.get('#authorize-sucess-role-label'),
        NotesLabel:       () => cy.get('#close-call-notes-textarea_'),


        //DetailsTab
        PolicyNo:         () => cy.get("#policy-details-policy-number-action-checkbox_label"),   
        PolicyNoLabel:    () => cy.get("#policy-details-policy-number-label"),
        IssDate:          () => cy.get("#policy-details-issue-date-action-checkbox_label"),
        IssDateLabel:     () => cy.get("#policy-details-effective-date-label"),
        IssState:         () => cy.get("#policy-details-issue-state-desc-action-checkbox_label"),
        IssStateLabel:    () => cy.get('#policy-details-issue-state-desc-label'),

        //RidersTab
        RidersTab:        () => cy.xpath('//span[text()="Riders"]'),
        RiderMsg:         () => cy.get("#rider-123-rider-messeage-checkbox_label"),
        CovPlan:          () => cy.get("#selected-coverage-coverage-plan-code-action-checkbox_label"),
        CovPlanLabel:     () => cy.get("#selected-coverage-coverage-plan-code-label"),
        CovName:          () => cy.get("#selected-coverage-coverage-name-action-checkbox_label"),
        CovNameLabel:     () => cy.get("#selected-coverage-coverage-name-label"),
        CovParName:       () => cy.get("#selected-coverage-coverage-party-name-action-checkbox_label"),
        CovParNameLabel:  () => cy.get("#selected-coverage-coverage-party-name-label"),
        AnnRidone:        () => cy.xpath('//span[text()="Riders"]//following::input[1]//following::span[1]'),
        AnnRidoneLabel:   () => cy.xpath('//span[text()="Riders"]//following::span[@class="rd-value pad-lAr0px p-l-34px textWrap"][1]'),
        AnnRidTwo:        () => cy.xpath('//span[text()="Riders"]//following::input[1]//following::span[5]'),
        AnnRidThree:      () => cy.xpath('//span[text()="Riders"]//following::input[1]//following::span[9]'),
        AnnRidThreeLabel: () => cy.xpath('//span[text()="Riders"]//following::span[@class=" pad-lAr0px p-l-34px textWrap"][1]'),
        //BillingTab
        BillingTab:       () => cy.xpath('//span[text()="Billing"]'),
        BillOpt:          () => cy.get("#billing-info-bill-option-desc-action-checkbox_label"),
        BillOptLabel:     () => cy.get("#billing-info-bill-option-desc-label"),
        BillAmt:          () => cy.get("#billing-info-modal-premium-action-checkbox_label"),
        BillAmtLabel:     () => cy.get("#billing-info-modal-premium-label"),
        TotalPrm:         () => cy.get("#policy-details-total-premium-paid-action-checkbox_label"),
        TotalPrmLabel:    () => cy.get("#policy-details-total-premium-paid-label"),

        //ValuesTab
        ValuesTab:        () => cy.xpath('//span[text()="Values"]'),
        FaceAmt:          () => cy.get("#policy-values-face-amount-action-checkbox_label"),
        Valeffdt:         () => cy.get("#policy-values-quote-effective-date-date_input"),
        FaceAmtLabel:     () => cy.get("#policy-values-face-amount-label"),
        QuoteBtn:         () => cy.get("#quote-values-undefined-button"),
        AcccashVal:       () => cy.get("#policy-values-accumulated-cash-value-action-checkbox_label"),
        AcccashValLabel:  () => cy.get('#policy-values-accumulated-cash-value-label'),
        NetCashSurr:      () => cy.get('#policy-values-cash-surrender-value-action-checkbox_label'),
        NetCashSurrLab:   () => cy.get('#policy-values-cash-surrender-value-label'),
        FreeOutAmt:       () => cy.get('#policy-values-free-withdrawal-amount-action-checkbox_label'),
        FreeOutAmtLab:    () => cy.get('#policy-values-free-withdrawal-amount-label'),

        //LoansTab
        LoansTab:         () => cy.xpath('//span[text()="Loan"]'),
        LoanMsgChk:       () => cy.get("#loan-transaction-history-loans-not-applicable-for-this-product-checkbox_label"),
        LoanReqDet:       () => cy.xpath('//span[@style="font-size:15px"]'),
        LoanMsg:          () => cy.xpath('//dt[@class="pull-left"]//following::span[1]'),
        MaxLoanAmt:       () => cy.get('#loan-values-max-loanable-value-action-checkbox_label'),
        LoanEffDate:      () => cy.get('#loan-values-quote-effective-date-date_input'),
        MaxLoanAmtLabel:  () => cy.get('#loan-values-max-loanable-value-label'),
        Noloan:           () => cy.get('#loan-transaction-history-no-note-checkbox_label'),

        //FundsTab
        FundsTab:         () => cy.xpath('//div[@aria-setsize="10"]//span[text()="Funds"]'),
        FundsMsgChk:      () => cy.get('#policy-values-no-note-checkbox_label'),
        FundReqDet:       () => cy.xpath('//span[@class="pad-lAr-10px"]'),
        FundNum:          () => cy.xpath('//th[text()=" Number "]//following::input[@type="checkbox"][1]'),
        FundNumLabel:     () => cy.xpath('//th[text()=" Number "]//following::span[1]'),
        FutAlloc:         () => cy.xpath('//th[text()=" Number "]//following::input[@type="checkbox"][3]'),
        FundAllocLabel:   () => cy.xpath('//th[text()=" Number "]//following::span[5]'),
        AnnFundNo:        () => cy.xpath('//div[@aria-setsize="10"]//span[text()="Funds"]//following::input[2]'),
        Annlabelone:      () => cy.xpath('//div[@aria-setsize="10"]//span[text()="Funds"]//following::label[4]'),
        AnnSecfield:       () => cy.xpath('//div[@aria-setsize="10"]//span[text()="Funds"]//following::input[3]'),
        Annlabeltwo:      () => cy.xpath('//div[@aria-setsize="10"]//span[text()="Funds"]//following::label[6]'),
        AnnThirdfield:    () => cy.xpath('//div[@aria-setsize="10"]//span[text()="Funds"]//following::input[5]'),
        Annlabelthree:    () => cy.xpath('//div[@aria-setsize="10"]//span[text()="Funds"]//following::label[10]'),

        


        //SuspenseTab
        SuspenseTab:      () => cy.xpath('//span[text()="Suspense"]'),
        SuspenseChk:      () => cy.get('#checkboxInTable_policySuspense_0_0-input'),
        SusAmtLabel:      () => cy.get('#policy-suspense-suspense-amount'),
        SusEffDatLabel:   () => cy.get('.SuspenseTab #_0__EFFECTIVE_DATE'),

        //Revolving Error
        RevolvingTab:     () => cy.xpath('//span[text()="Revolving Error"]'),
        RevolvChk:        () => cy.get('#checkboxInTable_policyRevolvingError_0_0-input'),
        RevolTypeLabel:   () => cy.get('#_0__TYPE'),
        RevolEffDtLabel:  () => cy.get('#_0__EFFECTIVE_DATE'),
        RevolAmtLabel:    () => cy.get('#_0__REVOLVING_AMOUNT'),

        //NotesTab
        NotesTab:         () => cy.xpath('//span[text()="Notes"]'),
        NotesTypeNo:      () => cy.get('#selected-note-type-no-action-checkbox_label'),
        NotesTypeNoLabel: () => cy.get('#selected-note-type-no-label'),
        NotesType:        () => cy.get("#selected-note-note-type-desc-action-checkbox_label"),
        NotesTypeLabel:   () => cy.get('#selected-note-note-type-desc-label'),

        //PendingTransaction
        PendingTranTab:   () => cy.xpath('//span[text()="Pending Transactions"]'),
        PendingTranLab:   () => cy.get('#pending-transactions-no-transaction-label_label'),
    
        //Requested Details Tab:
        ReqDetTab:        () => cy.xpath('//span[@class="pad-lAr-10px"]'),
        ReqDetFeiVal:     () => cy.get("dd"),
        ReqDetFeiName:    () => cy.get('.pull-left'),
        ReqDtAnnLoanMsg:  () => cy.get('[style="padding:5px;"]'),

        //Call History Tab
        CallHisTab:       () => cy.get(".callHisDtls"),
        CallHisMsg:       () => cy.get('.callHisLabel'),
        CallHisRea:       () => cy.get('#selected-call-history-reason-label'),
        CallHisDateTime:  () => cy.get('#selected-call-history-call-start-str-label'),
        CallHistTab:      () => cy.xpath('//mat-panel-title[text()=" Call History "]'),
        Caname:           () => cy.get('#_0__CALLER_NAME'),
        Carole:           () => cy.get('.callHistoryTable #_0__ROLE'),
        Careason:         () => cy.get('#_0__REASON'),
        CallDetName:      () => cy.get('#selected-call-history-caller-name-label'),
        Callrole:         () => cy.get('#selected-call-history-caller-role-label'),
        CaWorkReq:        () => cy.get('#callhtrydetails .oc-label-2'),
        CallDetail:       () => cy.xpath('//button[@id="modal__cross"]//following::h1[1]'),
        CallHistLoanMsg:  () => cy.xpath('//label[@class="oc-label-2 callHisLabel"]'),

        //My Call History Tab
        MyCallDate:       () => cy.get('#_0__DATE_TIME'),
        MyCallReason:     () => cy.get('#_0__REASON'),
        MyCallPolicy:     () => cy.get('.myCallHistoryTable #_0__POLICY_CAMELCASE'),

       
        
    }

    PolicyNoChkBox()
    {
        this.elements.PolicyNo().click({force:true});
    }
    IssDteChkBox()
    {
        this.elements.IssDate().click({force:true});
    }

    IssStateChkBox()
    {
        this.elements.IssState().click({force:true});
    }

    Riders()
    {
        this.elements.RidersTab().click({force:true});
    }

    RidersMsgChkBox()
    {
        this.elements.RiderMsg().click({force:true});
    }

    CovPlanChkBox()
    {
        this.elements.CovPlan().click({force:true});
    }

    CovNameChkBox()
    {
        this.elements.CovName().click({force:true});
    }

    CovParNameChkBox()
    {
        this.elements.CovParName().click({force:true});
    }

    AnnRidOneChkBox()
    {
        this.elements.AnnRidone().click({force:true});
    }

    AnnRidTwoChkBox()
    {
        this.elements.AnnRidTwo().click({force:true});
    }

    AnnRidThreeChkBox()
    {
        this.elements.AnnRidThree().click({force:true});
    }

    AnnRidVerChkBox()
    {
        this.elements.AnnRidVer().click({force:true});
    }
    Billing()
    {
        this.elements.BillingTab().click({force:true});
    }

    BillOptChkBox()
    {
        this.elements.BillOpt().click({force:true});
    }

    BillAmtChkBox()
    {
        this.elements.BillAmt().click({force:true});
    }

    TotalPrmChkBox()
    {
        this.elements.TotalPrm().click({force:true});
    }

    Values()
    {
        this.elements.ValuesTab().click({force:true});
    }

    FaceAmtChkBox()
    {
        this.elements.FaceAmt().click({force:true});
    }

    ButtonQuote()
    {
        this.elements.QuoteBtn().click({force:true});
    }

    AcccashChkBox()
    {
        this.elements.AcccashVal().click({force:true});
    }
    NetCashSurrChkBox()
    {
        this.elements.NetCashSurr().click({force:true});
    }
    FreeOutAmtChkBox()
    {
        this.elements.FreeOutAmt().click({force:true});
    }
    
    Loans()
    {
        this.elements.LoansTab().click({force:true});
    }

    LoanMsgChkBox()
    {
        this.elements.LoanMsgChk().click({force:true});
    }

    LoanMaxAmtChkBox()
    {
        this.elements.MaxLoanAmt().click({force:true});
    }

    NoLoanChkBox()
    {
        this.elements.Noloan().click({force:true});
    }

    Funds()
    {
        this.elements.FundsTab().click({force:true});
    }

    FundsMsgChkBox()
    {
        this.elements.FundsMsgChk().click({force:true});
    }

    FundNumChkBox()
    {
        this.elements.FundNum().click({force:true});
    }
    FutAllocChkBox()
    {
        this.elements.FutAlloc().click({force:true});
    }

    AnnFundNoChkBox()
    {
        this.elements.AnnFundNo().click({force:true});
    }

    AnnSecFieldChkBox()
    {
        this.elements.AnnSecfield().click({force:true});
    }

    AnnThirdfieldChkBox()
    {
        this.elements.AnnThirdfield().click({force:true});
    }

    Suspense()
    {
        this.elements.SuspenseTab().click({force:true});
    }

    Revolving()
    {
        this.elements.RevolvingTab().click({force:true});
    }

    SuspenseChkBox()
    {
        this.elements.SuspenseChk().click({force:true});
    }

    Notes()
    {
        this.elements.NotesTab().click({force:true});
    }

    RevolvChkBox()
    {
        this.elements.RevolvChk().click({force:true});
    }

    PendingTran()
    {
        this.elements.PendingTranTab().click({force:true});
    }

    NotesTypeNoChkBox()
    {
        this.elements.NotesTypeNo().click({force:true});
    }

    NotesTypeChkBox()
    {
        this.elements.NotesType().click({force:true});
    }

    CallHistoryTab()
    {
        this.elements.CallHistTab().click({force:true})
    }

    LoginButton()
    {
        this.elements.LoginBu().click()
    }

    SearchButton()
    {
        this.elements.SearchBut().click()
    }

    AuthorizeButton()
    {
        this.elements.AuthorizeBut().click()
    }
}


module.exports = new Details();