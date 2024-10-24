import RoutesWebsite from "./configs/RoutesWebsite.jsx";

import QueryProvider from "./providers-contexts/QueryProvider.jsx";
import { ModalProvider } from "./providers-contexts/ModalContext.jsx";
import { AlertProvider } from "./providers-contexts/AlertContext.jsx";
import { AuthProvider } from "./providers-contexts/AuthContext.jsx";
import { PersonAccountProvider } from "./providers-contexts/PersonContext.jsx";

const App = () => {
  return (
    <div>
      <QueryProvider>
        <PersonAccountProvider>
          <ModalProvider>
            <AlertProvider>
              <AuthProvider>
                <RoutesWebsite></RoutesWebsite>
              </AuthProvider>
            </AlertProvider>
          </ModalProvider>
        </PersonAccountProvider>
      </QueryProvider>
    </div>
  );
};

export default App;
