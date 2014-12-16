(function() {
  describe('Storage ::', function() {
    before(function() {
      return localStorage.clear();
    });
    it('set and get simple value', function() {
      parrot.local.add('one', 'two').add('three', 'four').add('five', 'six').one().should.eql('two');
      localStorage.setItem('one', 'three');
      return parrot.local.one().should.eql('three');
    });
    it('set and get object', function() {
      var _object;
      _object = {
        foo: 'bar'
      };
      return parrot.local.add('myData', _object).myData().foo.should.eql('bar');
    });
    it('updated a item', function() {
      return parrot.local.add('one', 'three').one().should.eql('three');
    });
    it('get the size', function() {
      return parrot.local.size().should.eql(4);
    });
    it('check for a key', function() {
      return parrot.local.isAvailable('one').should.eql(true);
    });
    it('remove one key', function() {
      var value;
      parrot.local.remove('one');
      (function() {
        return parrot.local.one();
      }).should["throw"]("undefined is not a function");
      value = localStorage['one'] || 'undefined';
      return value.should.eql('undefined');
    });
    it('remove different keys', function() {
      var value;
      parrot.local.remove('three', 'four');
      (function() {
        return parrot.local.three();
      }).should["throw"]("undefined is not a function");
      value = localStorage['three'] || 'undefined';
      value.should.eql('undefined');
      (function() {
        return parrot.local.four();
      }).should["throw"]("undefined is not a function");
      value = localStorage['four'] || 'undefined';
      return value.should.eql('undefined');
    });
    it('remove all', function() {
      parrot.local.removeAll();
      localStorage.length.should.eql(0);
      return parrot.local.size().should.eql(0);
    });
    return describe('Session ::', function() {
      it('save a simple session and retrieve', function() {
        parrot.session.add('session');
        sessionStorage.getItem('session').should.eql('session');
        return parrot.session.get().should.eql('session');
      });
      it('save a object session and retrieve', function() {
        var _session;
        _session = {
          foo: 'bar'
        };
        parrot.session.add(_session);
        return parrot.session.get().should.eql({
          foo: 'bar'
        });
      });
      return it('delete the session', function() {
        var value;
        parrot.session.remove();
        value = parrot.session.get() || 'null';
        value.should.eql('null');
        value = sessionStorage['session'] || 'undefined';
        return value.should.eql('undefined');
      });
    });
  });

}).call(this);
