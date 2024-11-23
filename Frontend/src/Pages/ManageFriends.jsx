import { FaSearch } from "react-icons/fa";
import Manage from "../Components/ManageFriends/Manage";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ManageFriends() {
    const { t } = useTranslation();
    const { tokens, customFetch } = useAuth();
    const [focus, setFocus] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();
    const handelNavigation = (id) => () => {
        navigate(`/profile/${id}`);
    }

    const get_all_users = async () => {
        try {
            const response = await customFetch("/api/users/all_users", {
                method: "GET",
                headers: {
                    "Authorization": "JWT " + tokens.access,
                }
            });
            if (response.ok) {
                let data = await response.json();
                setUsers(() => data);
            }
        } catch (error) {}
    }

    useEffect(() => {
        get_all_users();
    }, []);

    const handelSearch = (e) => {
        setSearch(e.target.value);
    }

    const debounce_searchig = useMemo(() => _.debounce(handelSearch, 500), []);

    const Filterusers = useMemo(() => {
        if (!search) {
            return filteredUsers;
        }
        return users.filter((user) => {
            return user.username.toLowerCase().includes(search.toLowerCase());
        });
    }, [search, users]);

    useEffect(() => {
        return () => {
          debounce_searchig.cancel();
        };
      }, [debounce_searchig]);

    return (
        <div className="text-white w-full flex items-center  justify-center bg-red-500 h-[100%] ">
            <div className=" relative w-11/12 h-5/6 xsm:p-4 sm:p-12 bg-secondaryColor rounded-lg border border-forthColor">
                <div className={` ${focus ? 'block' : 'hidden'} absolute w-full left-0 top-0 opacity-50 h-full bg-gray-400`}></div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className=" sm:text-4xl font-semibold" >{t("Friends")}</h1>
                    <div className="flex items-center justify-center relative">
                        <input 
                            className=" xsm:h-8 xsm:p-2  sm:h-12 sm:p-4 sm:w-72 relative rounded-lg text-gray-800 outline-none bg-gray-300"  
                            type="text" 
                            name="" 
                            id="" 
                            placeholder={t("add friend here")}
                            onChange={debounce_searchig}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setTimeout(() => setFocus(false), 300)}
                        />
                        <FaSearch className="absolute xsm:right-4 xsm:text-sx sm:right-5 sm:top-4 text-xl text-gray-500" />
                        <div className={` ${focus ? 'flex' : 'hidden'} flex-col gap-y-2 xsm:w-48 xsm:h-32 xsm:p-2 right-0 top-[4rem] rounded-lg bg-gray-300 sm:h-40 sm:p-4 sm:w-72 justify-center absolute overflow-y-auto`}>
                            {
                                Filterusers && Filterusers.length > 0 ? (
                                    Filterusers.map((user,index) => {
                                        return (
                                            <div key={index} className="w-full h-12 items-center justify-between py-2">
                                                <div 
                                                className="flex border border-gray-500 rounded-lg p-2"
                                                onClick={handelNavigation(user.id)}>
                                                    <div className="h-8 w-8 relative rounded-full">
                                                        <img
                                                            src={user.profile_image}
                                                            alt="profile"
                                                            className="w-full h-full object-cover rounded-full"
                                                        />
                                                    </div>
                                                    <h1 className="ml-4 text-black">{user.username}</h1>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : null
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full h-[90%] ">
                    <Manage/> 
                </div>
            </div>
        </div>
    )
}