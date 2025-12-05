import React, { useState, useEffect } from 'react';
import { addResource, getAlerts } from '../api/resourceApi';
import './ResourceManager.css';

/**
 * Component quản lý thêm thiết bị và cảnh báo quá tải
 */
function ResourceManager({ onResourceAdded, resources }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [alertCount, setAlertCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    cpu: 2,
    mem: 4,
    env: 'prod',
    service: 'web',
    team: ''
  });

  // Kiểm tra cảnh báo định kỳ
  useEffect(() => {
    if (resources && resources.length > 0) {
      checkAlerts();
      
      // Auto-refresh alerts every 30 seconds
      const interval = setInterval(checkAlerts, 30000);
      return () => clearInterval(interval);
    }
  }, [resources]);

  /**
   * Kiểm tra cảnh báo quá tải
   */
  const checkAlerts = async () => {
    try {
      const response = await getAlerts();
      if (response.success) {
        setAlerts(response.alerts);
        setAlertCount(response.alertCount);
      }
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    }
  };

  /**
   * Submit form thêm thiết bị
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const resourceData = {
        name: formData.name,
        cpu: parseInt(formData.cpu),
        mem: parseInt(formData.mem),
        tags: {
          env: formData.env,
          service: formData.service,
          ...(formData.team && { team: formData.team })
        }
      };

      const response = await addResource(resourceData);
      
      if (response.success) {
        setSuccess(`✅ Đã thêm thiết bị: ${response.resource.name}`);
        
        // Reset form
        setFormData({
          name: '',
          cpu: 2,
          mem: 4,
          env: 'prod',
          service: 'web',
          team: ''
        });

        // Notify parent
        if (onResourceAdded) {
          onResourceAdded(response.resource);
        }

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
          setShowAddForm(false);
        }, 3000);

        // Refresh alerts
        checkAlerts();
      }
    } catch (err) {
      setError('❌ Không thể thêm thiết bị. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Lấy icon severity
   */
  const getSeverityIcon = (severity) => {
    if (severity === 'CRITICAL') return '🔴';
    if (severity === 'WARNING') return '🟡';
    return '🔵';
  };

  /**
   * Lấy màu severity
   */
  const getSeverityClass = (severity) => {
    if (severity === 'CRITICAL') return 'critical';
    if (severity === 'WARNING') return 'warning';
    return 'info';
  };

  return (
    <div className="resource-manager">
      {/* === HEADER WITH BUTTONS === */}
      <div className="manager-header">
        <h2>⚙️ QUẢN LÝ TÀI NGUYÊN</h2>
        
        <div className="manager-actions">
          <button
            className="btn-add"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '❌ Đóng' : '➕ Thêm Thiết Bị'}
          </button>

          <button
            className={`btn-alerts ${alertCount > 0 ? 'has-alerts' : ''}`}
            onClick={() => {
              setShowAlerts(!showAlerts);
              checkAlerts();
            }}
          >
            🚨 Cảnh Báo
            {alertCount > 0 && <span className="alert-badge">{alertCount}</span>}
          </button>
        </div>
      </div>

      {/* === ADD RESOURCE FORM === */}
      {showAddForm && (
        <div className="add-form-container">
          <h3>➕ Thêm Thiết Bị Mới</h3>
          
          {success && <div className="alert-success">{success}</div>}
          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="add-form">
            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label>📛 Tên Thiết Bị <span className="required">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="vd: vm-prod-web-01"
                  required
                />
              </div>

              {/* CPU */}
              <div className="form-group">
                <label>⚙️ CPU (vCPU) <span className="required">*</span></label>
                <input
                  type="number"
                  min="1"
                  max="64"
                  value={formData.cpu}
                  onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
                  required
                />
              </div>

              {/* Memory */}
              <div className="form-group">
                <label>💾 Memory (GB) <span className="required">*</span></label>
                <input
                  type="number"
                  min="1"
                  max="256"
                  value={formData.mem}
                  onChange={(e) => setFormData({ ...formData, mem: e.target.value })}
                  required
                />
              </div>

              {/* Environment */}
              <div className="form-group">
                <label>🌍 Môi Trường <span className="required">*</span></label>
                <select
                  value={formData.env}
                  onChange={(e) => setFormData({ ...formData, env: e.target.value })}
                  required
                >
                  <option value="prod">Production</option>
                  <option value="staging">Staging</option>
                  <option value="test">Testing</option>
                  <option value="dev">Development</option>
                </select>
              </div>

              {/* Service Type */}
              <div className="form-group">
                <label>🔧 Loại Dịch Vụ <span className="required">*</span></label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                >
                  <option value="web">Web Server</option>
                  <option value="database">Database</option>
                  <option value="cache">Cache</option>
                  <option value="api">API</option>
                  <option value="worker">Worker</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>

              {/* Team */}
              <div className="form-group">
                <label>👥 Team (optional)</label>
                <input
                  type="text"
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                  placeholder="vd: backend, frontend"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowAddForm(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? '⏳ Đang thêm...' : '✅ Thêm Thiết Bị'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* === ALERTS PANEL === */}
      {showAlerts && (
        <div className="alerts-container">
          <div className="alerts-header">
            <h3>🚨 Cảnh Báo Quá Tải</h3>
            <button className="btn-refresh" onClick={checkAlerts}>
              🔄 Làm Mới
            </button>
          </div>

          {alerts.length === 0 ? (
            <div className="no-alerts">
              <p>✅ Không có cảnh báo</p>
              <p className="hint">Hệ thống đang hoạt động bình thường</p>
            </div>
          ) : (
            <div className="alerts-list">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`alert-item ${getSeverityClass(alert.severity)}`}
                >
                  <div className="alert-icon">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  
                  <div className="alert-content">
                    <div className="alert-header-row">
                      <span className="alert-resource">{alert.resourceName}</span>
                      <span className={`alert-severity ${getSeverityClass(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    
                    <div className="alert-message">{alert.message}</div>
                    
                    <div className="alert-details">
                      <span className="detail-item">
                        ⚙️ CPU: <strong>{alert.cpu}</strong> vCPU
                      </span>
                      <span className="detail-item">
                        💾 Memory: <strong>{alert.memory}</strong> GB
                      </span>
                      <span className="detail-item">
                        📊 {alert.classification}
                      </span>
                    </div>
                    
                    <div className="alert-timestamp">
                      🕐 {new Date(alert.timestamp).toLocaleString('vi-VN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* === STATISTICS === */}
          {alerts.length > 0 && (
            <div className="alert-stats">
              <div className="stat-item critical">
                <span className="stat-label">🔴 Critical</span>
                <span className="stat-value">
                  {alerts.filter((a) => a.severity === 'CRITICAL').length}
                </span>
              </div>
              <div className="stat-item warning">
                <span className="stat-label">🟡 Warning</span>
                <span className="stat-value">
                  {alerts.filter((a) => a.severity === 'WARNING').length}
                </span>
              </div>
              <div className="stat-item total">
                <span className="stat-label">📊 Tổng</span>
                <span className="stat-value">{alerts.length}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResourceManager;
