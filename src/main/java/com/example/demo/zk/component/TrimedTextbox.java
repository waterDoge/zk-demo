package com.example.demo.zk.component;

import org.zkoss.zk.ui.WrongValueException;
import org.zkoss.zul.Textbox;

public class TrimedTextbox extends Textbox {
    boolean trim = false;

    @Override
    public String getValue() throws WrongValueException {
        final String value = super.getValue();
        return trim && value != null ? value.trim(): value;
    }

    public boolean isTrim() {
        return trim;
    }

    public void setTrim(boolean trim) {
        this.trim = trim;
    }
}
