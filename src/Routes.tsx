import { Suspense, lazy } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";

const Login = lazy(() => import("./pages/Login/Login"));
const ProtectedPage = lazy(() => import("./Layout/ProtectedPage"));
const CpMangment = lazy(() => import("./pages/CpMangment/CpMangment"));
const Notification = lazy(() => import("./pages/Notification/Notification"));
const AddNotification = lazy(
  () => import("./pages/Notification/AddNotification/AddNotification")
);
const Salon = lazy(() => import("./pages/Salon/Salon"));
const AddSalon = lazy(() => import("./pages/Salon/AddSalon"));
const Fallback = lazy(() => import("./Components/Fallback"));
const Category = lazy(() => import("./pages/Category/Category"));
const AddCategory = lazy(() => import("./pages/Category/AddCategory/AddCategory"));
const Country = lazy(() => import("./pages/Country/Country"));
const City = lazy(() => import("./pages/City/City"));
const Coupon = lazy(() => import("./pages/Coupon/Coupon"));
const AddCoupon = lazy(() => import("./pages/Coupon/AddCoupon/AddCoupon"));
const Employee = lazy(() => import("./pages/Employee/Employee"));
const AddEmployee = lazy(() => import("./pages/Employee/AddEmployee"));
const Service = lazy(() => import("./pages/Service/Service"));
const AddService = lazy(() => import("./pages/Service/AddService"));
const EmployeeService = lazy(
  () => import("./pages/EmplyeeWithService/EmployeeService")
);
const Banner = lazy(() => import("./pages/Banner/Banner"));
const AddBanner = lazy(() => import("./pages/Banner/AddBanner"));
const FeedBack = lazy(() => import("./pages//FeedBack/FeedBack"));
const Fqa = lazy(() => import("./pages/FQA/FQA"));
const AddFQA = lazy(() => import("./pages/FQA/AddFQA"));
const Version = lazy(() => import("./pages/Version/Version"));
const AddVersion = lazy(() => import("./pages/Version/AddVersion"));
const Booking = lazy(() => import("./pages/Booking/Booking"));

const Permission = lazy(() => import("./pages/Permission/Permission"));
const EditRole = lazy(() => import("./pages/Permission/EditRole"));
const Routes = () => {
  return (
    <>
      <ReactRoutes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Fallback />}>
              <Login />
            </Suspense>
          }
        />
        <Route element={<ProtectedPage />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<></>}>
                <></>
              </Suspense>
            }
          />
          <Route
            path="/cp-management"
            index
            element={
              <Suspense fallback={<></>}>
                <CpMangment />
              </Suspense>
            }
          />{" "}
          <Route path="/permission">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Permission />
                </Suspense>
              }
            />
            <Route
              path="edit-role/:roleId"
              element={
                <Suspense fallback={<></>}>
                  <EditRole />
                </Suspense>
              }
            />
          </Route>
          <Route path="/category">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Category />
                </Suspense>
              }
            />
            <Route
              path="addCategory"
              element={
                <Suspense fallback={<></>}>
                  <AddCategory />
                </Suspense>
              }
            />
            <Route
              path="editCategory/:id"
              element={
                <Suspense fallback={<></>}>
                  <AddCategory />
                </Suspense>
              }
            />
          </Route>
          <Route path="/notifications">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Notification />
                </Suspense>
              }
            />
            <Route
              path="addNotification"
              element={
                <Suspense fallback={<></>}>
                  <AddNotification />
                </Suspense>
              }
            />
            <Route
              path="editNotification/:id"
              element={
                <Suspense fallback={<></>}>
                  <AddNotification />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/country"
            element={
              <Suspense fallback={<></>}>
                <Country />
              </Suspense>
            }
          />
          <Route
            path="/city"
            element={
              <Suspense fallback={<></>}>
                <City />
              </Suspense>
            }
          />
          <Route path="/salon">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Salon />
                </Suspense>
              }
            />
            <Route
              path="add-salon"
              element={
                <Suspense fallback={<></>}>
                  <AddSalon />
                </Suspense>
              }
            />
            <Route
              path="edit-salon/:salonId"
              element={
                <Suspense fallback={<></>}>
                  <AddSalon />
                </Suspense>
              }
            />
            <Route path="employee/:salonId">
              <Route
                index
                element={
                  <Suspense fallback={<></>}>
                    <Employee />
                  </Suspense>
                }
              />
              <Route
                path="add-employee"
                element={
                  <Suspense fallback={<></>}>
                    <AddEmployee />
                  </Suspense>
                }
              />
              <Route
                path="edit-employee/:empId"
                element={
                  <Suspense fallback={<></>}>
                    <AddEmployee />
                  </Suspense>
                }
              />
              <Route path="employeeService/:empId">
                <Route
                  index
                  element={
                    <Suspense fallback={<></>}>
                      <EmployeeService />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
            <Route path="service/:salonId">
              <Route
                index
                element={
                  <Suspense fallback={<></>}>
                    <Service />
                  </Suspense>
                }
              />
              <Route
                path="add-service"
                element={
                  <Suspense fallback={<></>}>
                    <AddService />
                  </Suspense>
                }
              />
              <Route
                path="edit-service/:servId"
                element={
                  <Suspense fallback={<></>}>
                    <AddService />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route path="/coupon">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Coupon />
                </Suspense>
              }
            />
            <Route
              path="addCoupon"
              element={
                <Suspense fallback={<></>}>
                  <AddCoupon />
                </Suspense>
              }
            />
            <Route
              path="editCoupon/:id"
              element={
                <Suspense fallback={<></>}>
                  <AddCoupon />
                </Suspense>
              }
            />
          </Route>
          <Route path="/banner">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Banner />
                </Suspense>
              }
            />
            <Route
              path="add-banner"
              element={
                <Suspense fallback={<></>}>
                  <AddBanner />
                </Suspense>
              }
            />
            <Route
              path="edit-banner/:bannerId"
              element={
                <Suspense fallback={<></>}>
                  <AddBanner />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/feedBack"
            element={
              <Suspense fallback={<></>}>
                <FeedBack />
              </Suspense>
            }
          />
          <Route path="/version">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Version />
                </Suspense>
              }
            />
            <Route
              path="add-version"
              element={
                <Suspense fallback={<></>}>
                  <AddVersion />
                </Suspense>
              }
            />
            <Route
              path="edit-version/:versionId"
              element={
                <Suspense fallback={<></>}>
                  <AddVersion />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/booking"
            element={
              <Suspense fallback={<></>}>
                <Booking />
              </Suspense>
            }
          />
          <Route path="fQa">
            <Route
              index
              element={
                <Suspense fallback={<></>}>
                  <Fqa />
                </Suspense>
              }
            />
            <Route
              path="addFQA"
              element={
                <Suspense fallback={<></>}>
                  <AddFQA />
                </Suspense>
              }
            />
            <Route
              path="editFQA/:id"
              element={
                <Suspense fallback={<></>}>
                  <AddFQA />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </ReactRoutes>
    </>
  );
};
export default Routes;
