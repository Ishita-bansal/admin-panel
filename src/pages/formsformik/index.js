import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  Checkbox,
  Button,
} from "@mui/material";
import "./styleform.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmpass: "",
  gender: "",
  interests: [],
  birthdate: null,
};

const emailregex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(20, "Name must be of 20 characters")
    .required("Required*"),
  email: yup
    .string()
    .matches(emailregex, "Invalid email format")
    .required("Required*"),
  password: yup
    .string()
    .max(4, "Password must be atleast of 4 characters")
    .required("Required*"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password")], "password must match")
    .required("Required*"),
  gender: yup.string().required("Select any one option"),
  interests: yup.bool().oneOf([true]).required("Required*"),
});

const Formsformik = () => {
  const objfield = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      component: "input",
    },

    {
      name: "email",
      type: "email",
      placeholder: "Email",
      component: "input",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      component: "input",
    },
    {
      name: "confirmpass",
      type: "password",
      placeholder: "Confirm Password",
      component: "input",
    },
    {
      name: "gender",
      options: ["male", "female", "other"],
      component: "select",
    },
    {
      name: ["reading", "sports", "games"],
      type: "checkbox",
    },
    {
      name: "birthdate",
      type: "date",
    },
  ];

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    let updateinterest = [...values.interests];
    if (checked) {
      updateinterest?.push(name);
      console.log("updateinterests", updateinterest);
    } else {
      updateinterest = updateinterest.filter((interest) => interest !== name);
    }
    setFieldValue("interests", updateinterest);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const { values, setFieldValue, touched, errors, setTouched } = formik;

  console.log("values==>", values);
  return (
    <div className="main-form-container">
      <form>
        <div className="forms-input-fields">
          {objfield?.map((user, i) => {
            return (
              <>
                {user.component === "input" && (
                  <div className="muifields" key={`${user?.name}-${i}`}>
                    <TextField
                      type={user?.type}
                      name={user?.name}
                      value={values?.[user?.name]}
                      onChange={(e) =>
                        setFieldValue(user?.name, e.target.value)
                      }
                      onBlur={() =>
                        setTouched({ ...touched, [user?.name]: true })
                      }
                      placeholder={user.placeholder}
                      sx={{ width: "350px" }}
                    />
                    {touched?.[user?.name] && errors?.[user?.name] ? (
                      <p>{errors?.[user?.name]}</p>
                    ) : (
                      <p style={{ visibility: "hidden" }}>text</p>
                    )}
                  </div>
                )}
                {user.component === "select" && (
                  <div className="muifields">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name={objfield.name}
                      value={values?.[objfield.name]}
                      onChange={(e) =>
                        setFieldValue(objfield.name, e.target.value)
                      }
                      onBlur={(e) =>
                        setTouched({ ...touched, [objfield?.name]: true })
                      }
                      style={{ width: "350px" }}
                    >
                      {objfield?.options?.map((users) => (
                        <MenuItem value={users}>{users}</MenuItem>
                      ))}
                    </Select>
                    {touched?.[objfield?.name] && errors?.[objfield?.name] ? (
                      <p>{errors?.[objfield?.name]}</p>
                    ) : (
                      <p style={{ visibility: "hidden" }}>text</p>
                    )}
                  </div>
                )}
              </>
            );
          })}

          <div className="muifields">
            <InputLabel>Gender</InputLabel>
            <Select
              name={objfield.name}
              value={values.gender}
              onChange={(e) => setFieldValue("gender", e.target.value)}
              onBlur={(e) => setTouched({ ...touched, confirmpass: true })}
              style={{ width: "350px" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {touched.gender && errors.gender ? (
              <p>{errors.gender}</p>
            ) : (
              <p style={{ visibility: "hidden" }}>text</p>
            )}
          </div>
          <div className="muifields">
            <InputLabel>Interests</InputLabel>
            <label>
              <Checkbox
                name="reading"
                onChange={handleCheckbox}
                onBlur={() => setTouched({ ...touched, checked: true })}
                checked={values.interests.includes("reading")}
              />
              reading
            </label>
            <label>
              <Checkbox
                name="sports"
                onChange={handleCheckbox}
                onBlur={() => setTouched({ ...touched, checked: true })}
                checked={values.interests.includes("sports")}
              />
              sports
            </label>
            <label>
              <Checkbox
                name="games"
                onChange={handleCheckbox}
                onBlur={() => setTouched({ ...touched, checked: true })}
                checked={values.interests.includes("games")}
              />
              games
            </label>
            {touched.interests && errors.interests ? (
              <p>{errors.interests}</p>
            ) : (
              <p style={{ visibility: "hidden" }}>text</p>
            )}
          </div>
          <div className="muifields">
            <InputLabel>Date of Birth</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                type="date"
                name="birthdate"
                value={values?.birthdate}
                onChange={(date) => setFieldValue("birthdate", date)}
                onBlur={() => setTouched({ ...touched, birthdate: true })}
                sx={{ width: "350px" }}
              />
            </LocalizationProvider>
            {touched.birthdate && errors.birthdate ? (
              <p>{errors.birthdate}</p>
            ) : (
              <p style={{ visibility: "hidden" }}>text</p>
            )}
          </div>
          <div className="forms-btn">
            <Button variant="contained">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Formsformik;
