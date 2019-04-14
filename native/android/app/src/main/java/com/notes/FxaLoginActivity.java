package com.notes;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.CookieManager;
import android.webkit.WebStorage;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.ValueCallback;
import android.widget.RelativeLayout;

import org.mozilla.testpilot.notes.R;

public class FxaLoginActivity extends AppCompatActivity {

    private WebView mWebView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fxa_login);
        Intent intent = getIntent();
        final String authUrl = intent.getStringExtra("authUrl");
        final String redirectUrl = intent.getStringExtra("redirectUrl");

        RelativeLayout view = (RelativeLayout) findViewById(R.id.webviewLayout);
        WebView webView = new WebView(getBaseContext());
        view.addView(webView);

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        CookieManager.getInstance().setAcceptCookie(true);
        WebStorage.getInstance().deleteAllData();
        WebView.setWebContentsDebuggingEnabled(true);
        final FxaLoginActivity act = this;

        final WebViewClient client = new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                if (url != null && url.startsWith(redirectUrl)) {
                    Uri uri = Uri.parse(url);
                    String code = uri.getQueryParameter("code");
                    String state = uri.getQueryParameter("state");
                    if (code != null && state != null) {
                        Intent data = new Intent();
                        data.putExtra("code", code);
                        data.putExtra("state", state);
                        setResult(2, data);

                        act.finish();
                    }
                }

                super.onPageStarted(view, url, favicon);
            }

            @Override
            public void onPageFinished(WebView view, String url) {

              final String fillEmailJs = "javascript: setInterval(" +
                    "function() {document.getElementsByName('email')[0].value = 'bforehandtest@restmail.net';" +
                    "document.getElementById('submit-btn').click()}, 5000)";
              final String fillPasswordJs = "javascript: setInterval(" +
                  "function() {document.getElementById('password').value = 'thisisatest123';" +
                  "document.getElementById('submit-btn').click()}, 5000)";
              final String continueJs = "javascript: document.getElementsByClassName('btn-continue')[0].click()";

              view.evaluateJavascript(fillEmailJs, new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String s) {}});
              view.evaluateJavascript(fillPasswordJs, new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String s) {}});
              view.evaluateJavascript(continueJs, new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String s) {}});
            }
        };

        webView.setWebViewClient(client);

        this.mWebView = webView;
        webView.loadUrl(authUrl);


        }


    @Override
    protected void onPause() {
        mWebView.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        mWebView.onResume();
        super.onResume();
    }

    @Override
    public void onBackPressed() {
        if (mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
