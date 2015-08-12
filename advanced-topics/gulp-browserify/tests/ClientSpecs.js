describe("Given Client class", function() {

  describe("when calling new Client() with too few arguments", function() {
    var createClient = function() {
      new Client(1, " A contact name");
    };
    it("then throws the correct exception", function() {
      expect(createClient).toThrow({
        name: 'ArgumentsException',
        message: 'The arguments length is incorrect.'
      });
    });
  });

  describe("when calling new Client() with an argument of the wrong type", function() {
    var createClient = function() {
      new Client(1, " A contact name", "Female", "Company2", "An email", "Phone1", "An address",
        "Date2014", "A bike", 200, "Some notes ");
    };
    it("then throws the correct exception", function() {
      expect(createClient).toThrow({
        name: "ArgumentsException",
        message: "One of the arguments does not have the expected type."
      });
    });
  });
});