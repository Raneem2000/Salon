import { FC, useState } from 'react'
import DeleteModal from '../../Components/DeleteModal'
import CouponHook from './hook/CouponHook'
import { showError, showSuccess } from '../../libs/reactToastify'


const DeleteCoupon: FC<{ id: string }> = ({ id }) => {

    const [Open, setOpen] = useState<boolean>(false)
    const { deleteCoupon, isDeleting, t } = CouponHook()


    const deleteHandler = () => {
        deleteCoupon(id,
            {
                onSuccess: () => {
                    setOpen(false);
                    showSuccess(t('Coupon.deleted'))

                },
                onError: () => {
                    showError(t('Coupon.wrong'))

                }
            })
    }

    return (
        <>
            <DeleteModal
                Open={Open}
                deleteFn={deleteHandler}
                isLoading={isDeleting}
                setOpen={setOpen}
            />
        </>
    )
}

export default DeleteCoupon