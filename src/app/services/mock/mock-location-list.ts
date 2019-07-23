export const LOC_LIST = [
    {  
        name: "Level 1 Parker", parentOrg: "Parker QCD", parentLoc: "1q2w4", locType: "Parent Org", svcLevel: "Platinum", id: '1', 
        subLoc: [
            {  
                name: "Level 1.1 Parker", parentOrg: "Parker QCD", parentLoc: "1q2w4", locType: "Division", svcLevel: "Platinum", id: '1.1', 
                subLoc: [
                    {  
                        name: "Level 1.1.1 Parker", parentOrg: "Parker QCD", parentLoc: "hy345", locType: "Parent Org", svcLevel: "Platinum", id: '4', 
                        subLoc: [], 
                        assets: [
                            { name: "Level 1.1.1 Loc 1", id:"locID1"}
                        ] 
                    }
                ], 
                assets: [{ name: "Level 1.1 Loc 1", id:"locID1"}] 
            },
            {  
                name: "Level 1.2 Parker FC", parentOrg: "Parker QCD", parentLoc: "q1wsd", locType: "Division", svcLevel: "Platinum", id: '1.2', 
                subLoc: [], 
                assets: [
                    {name: "Level 1.2 Loc 1 FC 1", id: "locID1.2"}
                ] 
            },
            {  
                name: "Level 1.3 Parker QCD", parentOrg: "Parker QCD", parentLoc: "4r4t5", locType: "Division", svcLevel: "Platinum", id: '1.3', 
                subLoc: [], 
                assets: [] 
            }
        ], 
        assets: [
            { name: "Level 1 Loc 1 Parker HQ ", id:"locID1"},
            { name: "Level 1 Loc 2 Parker HQ ", id:"locID2"}
        ] 
    },
    {  
        name: "Level 1 Ford", parentOrg: "Parker QCD", parentLoc: "q1wsd", locType: "Parent Org", svcLevel: "Platinum", id: '2', 
        subLoc: [], 
        assets: [] 
    },
    {  
        name: "Level 1 GMC", parentOrg: "Parker QCD", parentLoc: "4r4t5", locType: "Parent Org", svcLevel: "Platinum", id: '3', 
        subLoc: [], 
        assets: [] 
    },
    {  
        name: "Level 1 Toyota", parentOrg: "Parker QCD", parentLoc: "hy345", locType: "Parent Org", svcLevel: "Platinum", id: '4', 
        subLoc: [], 
        assets: [] 
    },
    {  
        name: "Level 1 Caterpillar", parentOrg: "Parker QCD", parentLoc: "22233", locType: "Parent Org", svcLevel: "Gold", id: '5', 
        subLoc: [], 
        assets: [] 
    },
    {  
        name: "Level 1 Boeing", parentOrg: "Parker QCD", parentLoc: "asdfg", locType: "Parent Org", svcLevel: "Gold", id: '6', 
        subLoc: [], 
        assets: [] 
    },
    {  
        name: "Level 1 NASA", parentOrg: "Parker QCD", parentLoc: "zxcvb", locType: "Parent Org", svcLevel: "Gold", id: '7', 
        subLoc: [], 
        assets: [] 
    },
    {  
        name: "Level 1 Dodge", parentOrg: "Parker QCD", parentLoc: "1q234", locType: "Parent Org", svcLevel: "Gold", id: '8', 
        subLoc: [], 
        assets: [] 
    },
    {  
        name: "Level 1 Acura", parentOrg: "Parker QCD", parentLoc: "hhh44", locType: "Parent Org", svcLevel: "Silver", id: '9', 
        subLoc: [], 
        assets: [] 
    },
    {  
        name: "Level 1 Maserati", parentOrg: "Parker QCD", parentLoc: "444hh", locType: "Parent Org", svcLevel: "Silver", id: '10', 
        subLoc: [], 
        assets: [] 
    }
];