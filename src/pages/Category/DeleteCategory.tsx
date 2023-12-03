import { FC, useState } from 'react';
import useCategoryHook from './hooks/useCategoryHook';
import { showError, showSuccess } from '../../libs/toast/Tostify';
import DeleteModal from '../../Components/DeleteModal';

const DeleteCategory: FC<{ id: string }> = ({ id }) => {


    const { deleteCategory, isDeletingCategory, t } = useCategoryHook();
    const [Open, setOpen] = useState<boolean>(false)

    const deleteHandler = () => {
        deleteCategory(id, {
            onSuccess: () => {
                showSuccess(t('Category.delete'));
                setOpen(false);
            },
            onError: () => {
                showError(t('Category.wrong'));
            }
        });
    }

    return (
        <>
            <DeleteModal Open={Open} deleteFn={deleteHandler} setOpen={setOpen} isLoading={isDeletingCategory} />
        </>
    )
}

export default DeleteCategory