/**
 * parrot-boilerplate - Storage Management for Parrot
 * @version v0.12.14
 * @link    https://github.com/parrotjs/parrot-module-storage
 * @author  Kiko Beats (https://github.com/Kikobeats)
 * @license MIT
 */
(function() {
  (function() {
    var _add, _get, _initStorage, _is, _remove, _removeAll, _size, _storage;
    _initStorage = (function() {
      var key, _results;
      for (key in localStorage) {
        parrot['local'][key] = parrot._partial(_get, 'local', key);
      }
      _results = [];
      for (key in sessionStorage) {
        _results.push(parrot['session'][key] = parrot._partial(_get, 'session', key));
      }
      return _results;
    })();
    _storage = function(type) {
      if (type === 'local') {
        return localStorage;
      } else {
        return sessionStorage;
      }
    };
    _get = function(type, key) {
      var data, e;
      data = _storage(type).getItem(key);
      try {
        return data = JSON.parse(data);
      } catch (_error) {
        e = _error;
        return data;
      }
    };
    _add = function(type, key, data) {
      if (typeof data !== 'string') {
        data = JSON.stringify(data);
      }
      _storage(type).setItem(key, data);
      return parrot[type][key] = parrot._partial(_get, type, key);
    };
    _remove = function(type, key) {
      delete parrot[type][key];
      return _storage(type).removeItem(key);
    };
    _removeAll = function(type) {
      var key;
      for (key in _storage(type)) {
        delete parrot[type][key];
      }
      return _storage(type).clear();
    };
    _size = function(type) {
      return _storage(type).length;
    };
    _is = function(type, key) {
      return _storage(type)[key] != null;
    };
    parrot.local = {
      add: function(key, data) {
        _add('local', key, data);
        return this;
      },
      remove: function() {
        var key, _i, _len;
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          key = arguments[_i];
          _remove('local', key);
        }
        return this;
      },
      removeAll: function() {
        _removeAll('local');
        return this;
      },
      size: function() {
        return _size('local');
      },
      isAvailable: function(key) {
        return _is('local', key);
      }
    };
    return parrot.session = {
      get: function() {
        return _get('session', 'session');
      },
      add: function() {
        var data, key;
        if (arguments.length === 1) {
          key = 'session';
          data = arguments[0];
        } else {
          key = arguments[0];
          data = arguments[1];
        }
        _add('session', key, data);
        return this;
      },
      remove: function() {
        var key, _i, _len;
        if (arguments.length === 0) {
          _remove('session', 'session');
        } else {
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            key = arguments[_i];
            _remove('session', key);
          }
        }
        return this;
      },
      removeAll: function() {
        _removeAll('session');
        return this;
      },
      size: function() {
        return _size('session');
      },
      isAvailable: function() {
        var key;
        key = arguments.length === 0 ? 'session' : arguments[0];
        return _is('session', key);
      }
    };
  })();

}).call(this);
