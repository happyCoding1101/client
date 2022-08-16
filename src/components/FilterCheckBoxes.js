import React, {Component} from 'react';

const FilterCheckboxes = ({onFilterChanged, checkedA, checkedB, /* ... and so forth or as separate object */}) => {
 return (
    //   <MuiThemeProvider theme={theme}>
        <FormGroup>
          <div className="filter__checkboxes">
            <div className="filter__checkboxes-column">
              <div className="checkboxes">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedA}
                      color="primary"
                      onChange={onFilterChanged("checkedA")}
                      value="checkedA"
                    />
                  }
                  label="Submitted"
                />
              </div>

            {/* your other checkboxes */}
            </div>
          </div>
        </FormGroup>
    //   </MuiThemeProvider>
    );
}