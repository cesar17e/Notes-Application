const AuthForm = ({ title, fields, onSubmit, loading, buttonText }) => {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6">
        
        {/* Background (match teacher’s global gradient) */}
        <div className="absolute inset-0 -z-10 h-full w-full 
          [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" 
        />
  
        {/* Centered Card */}
        <div className="w-full max-w-md">
          <div className="card bg-base-100/80 backdrop-blur-md border border-base-content/10 shadow-xl rounded-2xl">
            <div className="card-body space-y-6">
  
              {/* Title */}
              <h2 className="text-3xl font-bold text-center tracking-tight">
                {title}
              </h2>
  
              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {fields.map((field) => (
                  <div className="form-control" key={field.name}>
                    <label className="label" htmlFor={field.name}>
                      <span className="label-text text-base-content/80">
                        {field.label}
                      </span>
                    </label>
  
                    <input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder ?? ""}
                      className="input input-bordered rounded-xl bg-base-200/40 border-base-content/20 focus:border-primary focus:ring-primary"
                      value={field.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      required={field.required ?? true}
                    />
                  </div>
                ))}
  
                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full rounded-xl mt-2"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : buttonText}
                </button>
  
              </form>
  
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AuthForm;
  