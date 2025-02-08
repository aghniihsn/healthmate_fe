const cookie = {
  set: function (cname, cvalue, exdays, path) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = `;expires=${d.toUTCString()}`;
      const cookiePath = `;path=${(path || '/')}`;
      document.cookie = `${cname}=${cvalue + expires + cookiePath}`;
  },
  get: function (name) {
      if (typeof name === 'undefined') {
          return document.cookie.match(new RegExp('([a-zA-Z0-9:._]+)=([^;]+)', 'g'))
              .map(function (raw) {
                  return raw.split('=');
              })
              .reduce(function (o, v) {
                  o[v[0]] = v[1];
                  return o;
              }, {});
      } else {
          const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
          return match && typeof match[1] !== 'undefined' ? match[1] : false;
      }
  },
  del: function (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  },
};

export default cookie;
