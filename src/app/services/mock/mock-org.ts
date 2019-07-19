export const ORG_TABLE: any =[
    {Id:1,orgName:"Parker",orgType:"Parent Organization",custNo:"Org12",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test",SubOrganization:[{
        Id:1,orgName:"QCD",orgType:"Sub Organization",custNo:"Org12",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test", Location:[{
            Id:1,orgName:"Minnesota",orgType:"Immediate Parent Location",custNo:"Org12",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"
        }
    ]
    },
{Id:1,orgName:"FCG",orgType:"Sub Organization",custNo:"Org12",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test",Location:[{
    Id:1,orgName:"Golden Valley",orgType:"Test",custNo:"Org12",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"
}
]}]},
    {Id:2,orgName:"Ford",orgType:"Parent Org",custNo:"Outside",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"},
    {Id:2,orgName:"QCD",orgType:"Test",custNo:"Org14",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"},
    {Id:4,orgName:"Org4",orgType:"Test",custNo:"Org15",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test",SubOrganization:[{
        Id:1,orgName:"suborg2",orgType:"Test",custNo:"Org12",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test",Location:[{
            Id:1,orgName:"Loc3",orgType:"Test",custNo:"Org12",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"
        }
    ]
    },
{Id:1,orgName:"suborg3",orgType:"Test",custNo:"Org12",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"}]},
    {Id:5,orgName:"Org5",orgType:"Test",custNo:"Org16",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"},
    {Id:6,orgName:"Org6",orgType:"Test",custNo:"Org17",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"},
    {Id:7,orgName:"Org7",orgType:"Test",custNo:"Org18",contractStartDate:new Date(),contractEndDate:new Date(),svcLabel:"Test"},
    ];