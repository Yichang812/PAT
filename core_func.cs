     private void Button_ModelChecking_Click(object sender, EventArgs e)
        {
            try
            {
                if (ParseSpecification(true) != null)
                {
                    if(GUIUltility.AUTO_SAVE)
                    {
                        Save();
                    }
                    CurrentModule.ShowModelCheckingWindow(this.CurrentEditorTabItem.TabText.TrimEnd('*'));
                }
            }
            catch (Exception ex)
            {
                Ultility.LogException(ex, null);
            }
        }


        private void Button_Simulation_Click(object sender, EventArgs e)
        {
            try
            {
                //if the parsing is successful
                if (ParseSpecification(true) != null)
                {
                    if (GUIUltility.AUTO_SAVE)
                    {
                        Save();
                    }
                    CurrentModule.ShowSimulationWindow(this.CurrentEditorTabItem.TabText.TrimEnd('*'));
                }
               
            }
            catch (Exception ex)
            {
                Ultility.LogException(ex, null);
            }
        }

        private void MenuButton_VerificationBatch_Click(object sender, EventArgs e)
        {
            try
            {
                ModelCheckingBatchForm form = new ModelCheckingBatchForm();
                form.ShowDialog();

            }
            catch (Exception ex)
            {
                Ultility.LogException(ex, null);
            }
        }
