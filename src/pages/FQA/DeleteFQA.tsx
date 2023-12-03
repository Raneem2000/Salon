import React from 'react'
import DeleteModal from '../../Components/DeleteModal'
import FQAHook from './hook/FQAHook'
import { showError, showSuccess } from '../../libs/reactToastify'

const DeleteFQA: React.FC<{ id: string }> = ({ id }) => {

    const { t, deleteFQA, isDeletingFQA } = FQAHook()
    const [Open, setOpen] = React.useState(false);

    const deleteHandler = () => {
        deleteFQA(id, {
            onSuccess: () => {
                showSuccess(t('FQA.Deleted'))
                setOpen(false)
            },
            onError: () => {
                showError(t('FQA.wrong'))
            }
        })
    }

    return (
        <>
            <DeleteModal
                Open={Open}
                setOpen={setOpen}
                deleteFn={deleteHandler}
                isLoading={isDeletingFQA}
            />
        </>
    )
}

export default DeleteFQA