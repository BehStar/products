import RoutesWebsite from "./configs/RoutesWebsite.jsx";

import QueryProvider from "./providers-contexts/QueryProvider.jsx";
import { ModalProvider } from "./providers-contexts/ModalContext.jsx";
import { AlertProvider } from "./providers-contexts/AlertContext.jsx";
import { AuthProvider } from "./providers-contexts/AuthContext.jsx";
import { PersonAccountProvider } from "./providers-contexts/PersonContext.jsx";
import { ModalProductFormProvider } from "./providers-contexts/ModalFormProdcut.jsx";
import { ShowRemoveProvider } from "./providers-contexts/ShowRemoveContext.jsx";

const App = () => {
  return (
    <div>
      <QueryProvider>
        <PersonAccountProvider>
          <AlertProvider>
            <ModalProvider>
              <ModalProductFormProvider>
                <ShowRemoveProvider>
                  <AuthProvider>
                    <RoutesWebsite></RoutesWebsite>
                  </AuthProvider>
                </ShowRemoveProvider>
              </ModalProductFormProvider>
            </ModalProvider>
          </AlertProvider>
        </PersonAccountProvider>
      </QueryProvider>
    </div>
  );
};

export default App;
