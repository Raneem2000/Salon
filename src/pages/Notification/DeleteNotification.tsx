import { FC, useState } from 'react'

import DeleteModal from '../../Components/DeleteModal';
import useNotificationsHook from './hooks/useNotificationsHook.ts';
import { showError, showSuccess } from '../../libs/toast/Tostify';


const DeleteNotification: FC<{ id: string }> = ({ id }) => {

    const [Open, setOpen] = useState(false);

    const { deleteNotification, isDeleting, t } = useNotificationsHook();
    const deleteHandler = () => {
        deleteNotification(id, {
            onSuccess: () => {
                setOpen(false)
                showSuccess(t('Notification.deleted'))
            },
            onError: () => {
                showError(t('Notification.wrong'))
            }
        })
    }

    return (
        <>
            <DeleteModal
                Open={Open}
                setOpen={setOpen}
                deleteFn={deleteHandler}
                isLoading={isDeleting}
            />

        </>
    )
}

export default DeleteNotification