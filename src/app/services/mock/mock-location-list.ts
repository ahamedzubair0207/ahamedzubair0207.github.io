export const LOC_LIST = [
    {  
        name: "Level 1 Parker", svcStart: new Date(), custNum: "1q2w4", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Platinum", id: '1', 
        subOrg: [
            {  
                name: "Level 1.1 Parker", svcStart: new Date(), custNum: "1q2w4", orgType: "Division", svcEnd: new Date(), svcLevel: "Platinum", id: '1.1', 
                subOrg: [
                    {  
                        name: "Level 1.1.1 Parker", svcStart: new Date(), custNum: "hy345", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Platinum", id: '4', 
                        subOrg: [], 
                        loc: [
                            { name: "Level 1.1.1 Loc 1", id:"locID1"}
                        ] 
                    }
                ], 
                loc: [{ name: "Level 1.1 Loc 1", id:"locID1"}] 
            },
            {  
                name: "Level 1.2 Parker FC", svcStart: new Date(), custNum: "q1wsd", orgType: "Division", svcEnd: new Date(), svcLevel: "Platinum", id: '1.2', 
                subOrg: [], 
                loc: [
                    {name: "Level 1.2 Loc 1 FC 1", id: "locID1.2"}
                ] 
            },
            {  
                name: "Level 1.3 Parker QCD", svcStart: new Date(), custNum: "4r4t5", orgType: "Division", svcEnd: new Date(), svcLevel: "Platinum", id: '1.3', 
                subOrg: [], 
                loc: [] 
            }
        ], 
        loc: [
            { name: "Level 1 Loc 1 Parker HQ ", id:"locID1"},
            { name: "Level 1 Loc 2 Parker HQ ", id:"locID2"}
        ] 
    },
    {  
        name: "Level 1 Ford", svcStart: new Date(), custNum: "q1wsd", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Platinum", id: '2', 
        subOrg: [], 
        loc: [] 
    },
    {  
        name: "Level 1 GMC", svcStart: new Date(), custNum: "4r4t5", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Platinum", id: '3', 
        subOrg: [], 
        loc: [] 
    },
    {  
        name: "Level 1 Toyota", svcStart: new Date(), custNum: "hy345", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Platinum", id: '4', 
        subOrg: [], 
        loc: [] 
    },
    {  
        name: "Level 1 Caterpillar", svcStart: new Date(), custNum: "22233", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Gold", id: '5', 
        subOrg: [], 
        loc: [] 
    },
    {  
        name: "Level 1 Boeing", svcStart: new Date(), custNum: "asdfg", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Gold", id: '6', 
        subOrg: [], 
        loc: [] 
    },
    {  
        name: "Level 1 NASA", svcStart: new Date(), custNum: "zxcvb", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Gold", id: '7', 
        subOrg: [], 
        loc: [] 
    },
    {  
        name: "Level 1 Dodge", svcStart: new Date(), custNum: "1q234", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Gold", id: '8', 
        subOrg: [], 
        loc: [] 
    },
    {  
        name: "Level 1 Acura", svcStart: new Date(), custNum: "hhh44", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Silver", id: '9', 
        subOrg: [], 
        loc: [] 
    },
    {  
        name: "Level 1 Maserati", svcStart: new Date(), custNum: "444hh", orgType: "Parent Org", svcEnd: new Date(), svcLevel: "Silver", id: '10', 
        subOrg: [], 
        loc: [] 
    }
];