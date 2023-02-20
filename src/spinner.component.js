import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";


const Spinner = () => {
    console.log('spinner rendered');

    return <SpinnerOverlay><SpinnerContainer /></SpinnerOverlay>
}

export default Spinner;