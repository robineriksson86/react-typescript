import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ProfileCard from "./ProfileCard";
import {
  fetchProfiles,
  clearProfiles,
  fetchMoreProfiles,
} from "./redux/fetchProfiles";

const ProfilePage = ({}) => {
  const dispatch = useAppDispatch();

  const [fetchAmountOfProfiles, setFetchAmountOfProfiles] = useState(12);
  const [isLoading, setIsLoding] = useState(false);

  useEffect(() => {
    dispatch(fetchProfiles(12));
  }, []);
  const { profiles, fetchProfilesPending } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    setIsLoding(fetchProfilesPending);
  }, [fetchProfilesPending]);

  const onClickFetchAmount = (amount: number) => {
    setFetchAmountOfProfiles(amount);
    dispatch(clearProfiles());
    dispatch(fetchProfiles(amount));
  };

  const onClickFetchMore = () => {
    dispatch(
      fetchMoreProfiles({ limit: fetchAmountOfProfiles, profiles: profiles })
    );
  };

  return (
    <div className="profile-page">
      <div className="top-wrapper">
        <div>Fetch amount of profiles</div>
        <div className="button-wrapper">
          <button onClick={() => onClickFetchAmount(12)}>Fetch 12</button>
          <button onClick={() => onClickFetchAmount(24)}>Fetch 24</button>
          <button onClick={() => onClickFetchAmount(48)}>Fetch 48</button>
          <button onClick={() => onClickFetchAmount(100)}>Fetch 100</button>
        </div>
      </div>
      <h1>Secret Profiles</h1>
      {profiles.length === 0 ? (
        <div>No Results</div>
      ) : (
        <>
          <div className="wrapper">
            {profiles?.map((profile, index) => (
              <ProfileCard profile={profile} key={index} />
            ))}
          </div>
          <div className="bottom-wrapper">
            <button
              onClick={() => {
                onClickFetchMore();
              }}
            >
              {isLoading && <span className="loader"></span>}
              {`Load ${fetchAmountOfProfiles} more profiles`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default ProfilePage;
