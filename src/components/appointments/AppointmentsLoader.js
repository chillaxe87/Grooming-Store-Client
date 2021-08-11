import AppointmentsContextProvider from "../../context/AppointmentsContext";
import Appointments from "./Appointments";

const AppointmentsLoader = (props) => {

    const appointments = props.match
    return(
        <AppointmentsContextProvider>
            <Appointments appointments={appointments} />
        </AppointmentsContextProvider>
    );
}

export default AppointmentsLoader