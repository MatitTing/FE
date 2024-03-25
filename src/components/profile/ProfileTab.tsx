import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PartySituation from './PartySituation';
import styled from '@emotion/styled';
import PartyRequestList from './PartyRequestList';
import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import ProfileTabPanel from './ProfileTabPanel';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import getProfile, { API_GET_PROFILE_KEY } from 'src/api/getProfile';
import TabComponent from './TabComponent';

interface CategoryItemType {
    id: string;
    label: string;
}

const TabContainer = styled.div`
    display: flex;
    /* gap: 30px; */
    border-bottom: 1px solid #ebebeb;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const categoryList: CategoryItemType[] = [
    { id: 'situation', label: '파티현황' },
    { id: 'request', label: '초대요청' },
    { id: 'review', label: '후기' },
];

export default function ProfileTab() {
    const [selectedLabel, setSelectedLabel] = useState<string>('파티현황');
    // const router = useRouter();
    // const category = router.query.category as string;

    // if (!category) {
    //   return null;
    // }
    const profile = useSuspenseQuery({
        queryKey: [API_GET_PROFILE_KEY],
        queryFn: () => getProfile(),
    });

    // console.log(profile.data.role)

    // const currentTab = categorylist.findIndex((item) => item.id === category);
    // const [value, setValue] = useState(currentTab);

    // const handleChange = (_: SyntheticEvent, newValue: number) => {
    //   setValue(newValue);
    // };

    return (
        <Wrapper>
            <TabContainer>
                {categoryList.map((category) => (
                    <TabComponent
                        onClick={setSelectedLabel}
                        label={category.label}
                        key={category.id}
                        isSelected={selectedLabel === category.label}
                    />
                ))}
            </TabContainer>
        </Wrapper>
        // <Box sx={{ width: "100%" }}>
        //   <TabContainer>
        //     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        //       <Tabs
        //         value={value}
        //         onChange={handleChange}
        //         aria-label="basic tabs example"
        //       >
        //         {categorylist.map(({ id, label }, index) => (
        //           <Tab
        //             key={id}
        //             label={label}
        //             {...a11yProps(index)}
        //             onClick={() => {
        //               router.push({
        //                 query: {
        //                   ...router.query,
        //                   category: id,
        //                 },
        //               });
        //             }}
        //           />
        //         ))}
        //       </Tabs>
        //     </Box>
        //   </TabContainer>
        //   {categorylist.map(({ id, component }, index) => (
        //     <ProfileTabPanel key={id} value={value} index={index}>
        //       {component}
        //     </ProfileTabPanel>
        //   ))}
        // </Box>
    );
}
