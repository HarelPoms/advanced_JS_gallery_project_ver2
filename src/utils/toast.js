const toastLiveExample = document.getElementById('toast-1')

const showToast = () =>{
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
}

export default showToast;

