import React from 'react';
import useAdmin from '../../Hooks/useAdmin';
import useInstractor from '../../Hooks/useInstractor';
// import ManageClases from '../Admin/ManageClasses/ManageClasses'
import ManageClasses from '../Admin/ManageClasses/ManageClasses';
import AddClass from '../Instractors/AddClass/AddClass';
import MyClasses from '../UserStudent/MyClasses/MyClasses';

const DashBoardHome = () => {
    const [Admin, isAdminLoading] = useAdmin();
    const [isInstractor, isInstractorLoading] = useInstractor();
    return (
        <div className='w-full'>
            {
                Admin.admin ? <>
                    <ManageClasses></ManageClasses>
                </> : isInstractor.instractor ? <>
                     <AddClass></AddClass>
                    </> : <> <MyClasses></MyClasses> </>
            }
        </div>
    );
};

export default DashBoardHome;