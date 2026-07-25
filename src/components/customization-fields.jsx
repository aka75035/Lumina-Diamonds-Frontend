"use client";

export default function CustomizationFields({

  product,
  formData,
  setFormData,

}) {

  // =========================
  // SHOW ONLY VISIBLE FIELDS
  // =========================

  const visibleFields = product.customizationFields?.filter(field => {

  // no dependency
  if (!field.dependsOn?.field) {
    return true;
  }

  const depField = field.dependsOn.field;
  const depValue = field.dependsOn.value;

  const isVisible =
    formData[depField] === depValue;

  // =========================
  // AUTO SELECT FIRST OPTION
  // =========================

  if (
    isVisible &&
    field.type === "select" &&
    field.options?.length &&
    !formData[field.name]
  ) {

    setTimeout(() => {
  const index = field.options.indexOf(product?.purity);

    setFormData(prev => ({...prev, [field.name]: index !== -1 ? field.options[index] : field.options[0]}));
  }, 0);

  }

  return isVisible;

});

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (field, value) => {

  setFormData(prev => {

    const updated = { ...prev, [field.name]: value };

    // LOOP THROUGH ALL FIELDS
    product.customizationFields.forEach(f => {

  if (!f.dependsOn?.field) {
    return;
  }

  if (f.dependsOn.field !== field.name) {
    return;
  }

  const shouldShow = f.dependsOn.value === value;

  // =========================
  // AUTO SELECT prduct.purity OPTION from customizationfiled
  // ONLY FIRST TIME
  // =========================

  if (shouldShow && f.type === "select" && f.options?.length) {
    
    if (!updated[f.name]) {
      const index = f.options.indexOf(product?.purity);
      if(index!==-1){
      updated[f.name] = f.options[index];
      }
    }

  }

});

    return updated;

  });

};

  return (

    <>

      {visibleFields?.map((field, index) => (

        <div
          key={index}
          className="mb-6"
        >

          <label
            className="
              text-sm
              font-medium
              block
              mb-2
            "
          >

            {field.label || field.name}

          </label>

          {/* ========================= */}
          {/* SELECT FIELD */}
          {/* ========================= */}

          {field.type === "select" ? (

            <div
              className="
                grid
                grid-cols-3
                gap-3
              "
            >

              {field.options?.map(opt => (

                <label

                  key={opt}

                  className={`
                    cursor-pointer
                    text-center
                    py-3
                    border
                    rounded
                    transition

                    ${
                      formData[field.name] === opt
                      ? "bg-black text-white border-black"
                      : "bg-gray-100"
                    }
                  `}

                >

                  <input

                    type="radio"

                    name={field.name}

                    value={opt}

                    checked={
                      formData[field.name]
                      === opt
                    }

                    className="hidden"

                    onChange={(e) =>
                      handleChange(
                        field,
                        e.target.value
                      )
                    }

                  />

                  {opt}

                </label>

              ))}

            </div>

          ) : (

            // =========================
            // INPUT FIELD
            // =========================

            <input

              type={field.type}

              className="
                border
                p-3
                w-full
                rounded
              "

              placeholder={
                field.placeholder || ""
              }

              value={
                formData[field.name] || ""
              }

              onChange={(e) =>

                handleChange(

                  field,

                  field.type === "number"
                    ? Number(e.target.value)
                    : e.target.value

                )

              }

            />

          )}

        </div>

      ))}

    </>

  );

}