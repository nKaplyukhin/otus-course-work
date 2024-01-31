import React, { FC } from 'react';
import { Modal } from 'components/Modal';
import { useChangeProfileDataMutation } from 'store/rtk/profile';
import { ValidationErrorsResponse } from 'interfaces/store';
import { ChangeProfileDataForm } from 'components/Forms';
import { IProfileData } from 'interfaces/profile';
import { IChangeDataForm } from 'interfaces/form';

interface IProps {
  closeModal: () => void;
  profileData: IProfileData;
}

export const ChangeProfileDataModal: FC<IProps> = ({ closeModal, profileData }) => {
  const [changeData, { error }] = useChangeProfileDataMutation();

  const onSubmit = async (data: IChangeDataForm) => {
    const res = await changeData(data);
    if ('data' in res) {
      closeModal();
    }
  };

  return (
    <Modal onClose={closeModal}>
      <ChangeProfileDataForm
        submitError={(error as ValidationErrorsResponse)?.data.errors[0].message}
        profileData={profileData}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
