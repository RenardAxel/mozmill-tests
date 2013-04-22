
var TEST_URL = 'https://aful.org/~madarche/appcache_and_ajax_get/';

var setupModule = function (module) {
    module.controller = mozmill.getBrowserController();
};

var testAppcacheAjax = function() {
    // 1. Go to URL where there is an AppCache manifest
    //
    // NOTE: The web site is allowed to set offline data through a predefined
    // Mozmill profile.
    controller.click(new elementslib.Elem(controller.menus['file-menu']['menu_newNavigatorTab']));
    controller.open(TEST_URL);
    controller.waitForPageLoad();
    //controller.window.alert("Page loaded");

    // 2. Click the "Test" button in the web page
    var test_button = new elementslib.ID(controller.tabs.activeTab, 'test-button');
    controller.assertNode(test_button);
    controller.click(test_button);
    // Now there should be a "Success" message in the result box
    var result_box = new elementslib.ID(controller.tabs.activeTab, 'result');
    controller.assertNode(result_box);
    controller.waitFor(function() {
            // Wait until the actioned AJAX call produces a result
            return result_box.getNode().innerHTML.trim() !== '';
        }
    );
    // controller.assertText(result_box, "Success"); // assertText doesn't work
    controller.assert(function() {
                          return result_box.getNode().innerHTML.trim() === 'Success';
                      },
            "Content is: " + result_box.getNode().innerHTML.trim()
    );

    // 3. Reload the web page once
    controller.open(TEST_URL);
    controller.waitForPageLoad();

    // 4. Click the "Test" button in the web page again
    controller.assertNode(test_button);
    controller.click(test_button);
    controller.waitFor(function() {
            // Wait until the actioned AJAX call produces a result
            return result_box.getNode().innerHTML.trim() !== '';
        }
    );
    // Again, there should be a "Success" message in the result box
    //controller.assertText(result_box, "Success"); // assertText doesn't work
    controller.assert(function() {
                          return result_box.getNode().innerHTML.trim() === 'Success';
                      },
            "Content is: " + result_box.getNode().innerHTML.trim()
    );
};

